#IfWinActive ahk_exe sdvdiff.exe
d::Send, {F8}
e::Send, {F7}
#IfWinActive ahk_exe codeflow.exe
d::Send, {F8}
^d::Send, ^{F8}
e::Send, {F7}
^e::Send, ^{F8}
Return
