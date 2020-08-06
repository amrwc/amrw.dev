#!/usr/bin/osascript

do shell script "/bin/zsh -s << 'EOF'
device=$(networksetup -listallhardwareports | awk '$3==\"Wi-Fi\" {getline;print}' | awk '{print $2}')
power=$(networksetup -getairportpower \"$device\" | awk '{print $4}' | tr '[:upper:]' '[:lower:]')

if [[ \"$power\" == 'on' ]]; then
	opposite_power='off'
else
	opposite_power='on'
fi

networksetup -setairportpower \"$device\" \"$opposite_power\"
EOF"
