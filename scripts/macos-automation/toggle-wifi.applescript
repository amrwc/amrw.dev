#!/usr/bin/osascript

set device to (do shell script "networksetup -listallhardwareports | awk '$3==\"Wi-Fi\" {getline;print}' | awk '{print $2}'")
set power to (do shell script "networksetup -getairportpower " & device & " | awk '{print $4}' | tr '[:upper:]' '[:lower:]'")

set opposite_power to ""
if power = "on" then
    set opposite_power to "off"
else
    set opposite_power to "on"
end if

do shell script "networksetup -setairportpower " & device & " " & opposite_power
