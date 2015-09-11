// Support script for WinDbg disassembly test (with lines in private symbols)
// .shell -o d:\output.dgml -ci "uf ." cscript.exe /nologo dasm2dgml.js
// This is inspired from http://blogs.msdn.com/b/reiley/archive/2012/08/19/visualize-assembly-using-dgml.aspx
// with minor fixes
var EBB = [];

var hypertext=function(s){
  var r=[],L=s.length;
  for(var i=0;i<L;i++){
    var c=s.charAt(i);
    switch(c){
      case '"':r.push('&quot;');break;
      case '&':r.push('&amp;');break;
      case '<':r.push('&lt;');break;
      case '>':r.push('&gt;');break;
      default:r.push(c);}}
  return r.join('');
};

var map=function(f,v){
    var L=v.length,r=[];
    for(var i=0;i<L;i++)
        r.push(f(v[i]));
    return r;
};

(function(){
  var blk;

  var CExtendedBasicBlock = function(name, previous, next){
    this.Address = '';
    this.Code = [];
    this.Name = name;
    this.Previous = previous;
    this.Next = next;
  };

  while(true)
  {
    if(WScript.StdIn.AtEndOfStream)
      break;
    var strSourceLine = WScript.StdIn.ReadLine().replace(/(^\s+)|(\s+$)/g, '');
    if(!strSourceLine)
      continue;
    if(strSourceLine.match(/.*:$/))
    {
      var blockName = strSourceLine.replace(/\[.+@\s+/, '').replace(/\]/, '');
      blk = new CExtendedBasicBlock(blockName);
      EBB.push(blk);
    }
    else
    {
      blk.Address = blk.Address || strSourceLine.match(/^\S+\s+[^\s]+/)[0].replace(/[\S]+\s+/, '');
      blk.Code.push(strSourceLine.replace(/[^\s]+\s+/, '').replace(/[^\s]+\s+[^\s]+\s+/, ''));
    }
  }
})();

EBB = EBB.sort(function(x, y){ return x.Address == y.Address ? 0 : x.Address > y.Address ? 1 : -1; });
for(var i = 1; i < EBB.length; i++)
{
  EBB[i].Previous = EBB[i - 1];
  EBB[i].Previous.Next = EBB[i];
}

WScript.Echo('<DirectedGraph Background="#8ACA9A" GraphDirection="TopToBottom" xmlns="http://schemas.microsoft.com/vs/2009/dgml">');
WScript.Echo('  <Nodes>');
map(function(blk){
  var content = hypertext(blk.Name + ' (' + blk.Address + ')') + '&#xD;&#xA;';
  map(function(instruction){
    content += '&#xD;&#xA;' + hypertext(instruction);
  }, blk.Code);
  WScript.Echo('    <Node Id="' + hypertext(blk.Name) + '" Label="' + content + '" />');
}, EBB);
WScript.Echo('  </Nodes>');
WScript.Echo('  <Links>');

map(function(blk){
  map(function(instruction){
    map(function(x){
      var idx = instruction.indexOf(x.Address);
      idx = idx >= 0 ? instruction.charAt(idx + x.Name.length) : -1;
      if(idx == '' || idx == ' ')
        WScript.Echo('    <Link Source="' + hypertext(blk.Name) + '" Target="' + hypertext(x.Name) + '" />');
    }, EBB);
  }, blk.Code);
  if(blk.Next && !(blk.Code[blk.Code.length - 1].match(/^[^\s]+/)[0] in {jmp: 0, ret: 0}))
    WScript.Echo('    <Link Category="FallThrough" Source="' + hypertext(blk.Name) + '" Target="' + hypertext(blk.Next.Name) + '" />');
}, EBB);

WScript.Echo('  </Links>');
WScript.Echo('  <Styles>');
WScript.Echo('    <Style TargetType="Node">');
WScript.Echo('      <Setter Property="FontFamily" Value="Consolas" />');
WScript.Echo('      <Setter Property="FontSize" Value="11" />');
WScript.Echo('      <Setter Property="Background" Value="White" />');
WScript.Echo('      <Setter Property="NodeRadius" Value="2" />');
WScript.Echo('    </Style>');
WScript.Echo('    <Style TargetType="Link">');
WScript.Echo('        <Condition Expression="HasCategory(\'FallThrough\')" />');
WScript.Echo('        <Setter Property="Background" Value="Red" />');
WScript.Echo('        <Setter Property="Stroke" Value="Red" />');
WScript.Echo('    </Style>');
WScript.Echo('  </Styles>');
WScript.Echo('</DirectedGraph>');
