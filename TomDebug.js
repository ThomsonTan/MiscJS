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

function GoUntilStr(str)
{
    var ctl = host.namespace.Debugger.Utility.Control;

    let contGo = true;

    while (contGo)
    {
        let output = ctl.ExecuteCommand('g');
        for (let line of output)
        {
            log(line);

            if (line.toLowerCase().includes(str.toLowerCase()))
            {
                contGo = false;
            }
        }
    }

}

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
        let tmpAddr;

        if (lineArr.length >= 3 && (lineArr[2] === 'call' || lineArr[2] === 'mov'))
        {
            // work for both call and mov
            if(lineArr.length >= 7 
               && /* lineArr[3] === 'dword' && */ lineArr[4] === 'ptr'
               && lineArr[6].length > 9 && lineArr[6].startsWith('('))
            {
                // TODO: handle 64-bit
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
            else if (lineArr.length == 5 && (tmpAddr = lineArr[4].match(/\(([\da-f`]+)\)/)))
            {
                let callAddr = tmpAddr[1];
                let callTargetDis = ctl.ExecuteCommand('u ' + callAddr + ' l1');
                if (callTargetDis.Count() == 2)
                {
                    let i = 0;
                    for (let callTargetLine of callTargetDis)
                    {
                        if (i++ === 0) continue;
                        let callTargetArr = callTargetLine.split(/\s+/);
                        if (callTargetArr.length === 7 && callTargetArr[2] === 'jmp'
                            && /* callTargetArr[3] === 'dword' && */ callTargetArr[4] === 'ptr'
                            && callTargetArr[6].length > 9 && callTargetArr[6].startsWith('('))
                        {
                            let importAddr = callTargetArr[6].slice(1, 9);
                            let dpsOut = ctl.ExecuteCommand('dps ' + importAddr + ' l1');
                            if (dpsOut.Count() == 1)
                            {
                                let dpsLine = dpsOut.First();
                                let dpsArr = dpsLine.split(/\s+/);
                                if(dpsArr.length >= 3)
                                {
                                    let newLine = line.replace(lineArr[3], '_imp_' + dpsArr[2]);
                                    log(newLine);
                                    processed = true;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!processed)
        {
            log(line);
        }
    }
}
