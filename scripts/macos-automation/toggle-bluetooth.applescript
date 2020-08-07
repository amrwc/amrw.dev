#!/usr/bin/osascript

tell application "System Preferences"
    reveal pane id "com.apple.preferences.Bluetooth"
    set the current pane to pane id "com.apple.preferences.Bluetooth"
end tell

try
    tell application "System Events" to tell process "System Preferences"
        click button "Turn Bluetooth On" of window "Bluetooth"
    end tell
on error
    tell application "System Events" to tell process "System Preferences"
        click button "Turn Bluetooth Off" of window "Bluetooth"
    end tell
end try

tell application "System Preferences" to quit
