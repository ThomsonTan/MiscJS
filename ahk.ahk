ToggleScroll = 0;
#MaxThreadsPerHotkey 2
#IfWinActive ahk_exe sdvdiff.exe
d::Send, {F8}
e::Send, {F7}
Space::
ToggleScroll := !ToggleScroll
while ToggleScroll
{
    Send {WheelDown}
    Sleep 200
}
return

#IfWinActive ahk_exe codeflow.exe
d::Send, {F8}
^d::Send, ^{F8}
e::Send, {F7}
^e::Send, ^{F8}
Return
