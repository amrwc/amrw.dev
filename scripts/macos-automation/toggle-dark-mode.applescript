#!/usr/bin/osascript

(**
 * Usage:
 * $ osascript toggle-dark-mode.applescript
 *
 * Usage without explicitly calling 'osascript':
 * 1. Remove the '.applescript' file extension.
 * 2. You can now run the script like: `./toggle-dark-mode`.
 *
 * Usage with Touch Bar:
 * 1. Open Automator and create a new document.
 * 2. When asked, choose 'Quick Action'.
 * 3. Find 'Run AppleScript' on the list.
 * 4. Set 'Workflow receives' near the top to 'no input'.
 * 5. In the Run AppleScript action paste the script that follows.
 * 6. Save the quick action with a name of your choice.
 *
 * The quick action should now be available to use with the Quick Actions
 * button on the touch bar. You can check and disable this and other actions in
 * System Preferences -> Extensions -> Touch Bar. The actions are stored with
 * the '.workflow' file extension at this path: `~/Library/Services`.
 *
 * Usage as an app:
 * 1. Open the file with Script Editor.
 * 2. Go to File -> Export...
 * 3. Set 'File Format' to 'Application'.
 * 4. Choose the save location and save.
 *)

tell application "System Events"
	tell appearance preferences
		set dark mode to not dark mode
	end tell
end tell
