"use strict"

// try to resolve indirect address in the output of 'uf' to symbol address
// 
// Usage:
//      .scriptload file.js
//      dx -r1 Debugger.@"State".@"Scripts".@"unosym".@"Contents".unosym("0x00007ff8`6e9b34b0")
//      .scriptunload file.jd

function initializeScript()
{

}

function invokeScript()
{

}

function uninitializeScript()
{

}

function log(str){host.diagnostics.debugLog(str + '\n')};

function ufnosym(address)
{
    var ctl = host.namespace.Debugger.Utility.Control;

    var expandedAddr;
    if (typeof address === 'string')
    {
        expandedAddr = 'uf ' + (address.toLowerCase().startsWith('0x') ? address : '0x' + address);
    }
    else if (typeof address === 'number')
    {
        expandedAddr = 'uf 0n' + address;
    }
    else
    {
        expandedAddr = 'uf .';
    }

    var disOut = ctl.ExecuteCommand(expandedAddr);
    for (let line of disOut)
    {
        let lineArr = line.split(/\s+/);
        let processed = false;

        if (lineArr.length >= 7 && lineArr[2] === 'call'
            && lineArr[3] === 'dword' && lineArr[4] === 'ptr'
            && lineArr[6].length > 9 && lineArr[6][0] === '(')
        {
            let importAddr = lineArr[6].slice(1, 9);
            let dpsOut = ctl.ExecuteCommand('dps ' + importAddr + ' l1');
            if (dpsOut.Count() == 1)
            {
                let dpsLine = dpsOut.First();
                let dpsArr = dpsLine.split(/\s+/);
                if(dpsArr.length >= 3)
                {
                    let newLine = line.slice(0, line.indexOf('[') + 1) + dpsArr[2] + ']';
                    log(newLine);
                    processed = true;
                }
            }
        }

        if (!processed)
        {
            log(line);
        }
    }
}
