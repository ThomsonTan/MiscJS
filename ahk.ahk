; SetTitleMatchMode RegEx

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

ToggleNavCF = 0; ;cannot set it = 1?
#IfWinActive ahk_exe codeflow.exe
^s::
ToggleNavCF := !ToggleNavCF
return
d::
if ToggleNavCF {
    Send, d
} else {
    Send, {F8}
}
return
^d::
if ToggleNavCF {
    Send, ^d
} else {
    Send, ^{F8}
}
return
e::
if ToggleNavCF {
    Send, e
} else {
    Send, {F7}
}
return
^e::
if ToggleNavCF {
    Send, ^e
} else {
    Send, ^{F7}
}
return

#IfWinActive ahk_exe reSearch v2.exe
^d::Send, {F8}
^e::Send, {F7}
^s::Send, {F12}
^r::Send, {F11}
^Space::Send, {Space}{End}^v{Space}AND{Space}NOT{Space}path:\xbox{Enter}
!d::Send, !u
return

#IfWinActive ahk_exe devenv.exe
^d::Send, ^-

Return
