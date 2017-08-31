adb shell /data/local/tmp/minitouch & {
	sleep 1
	adb forward tcp:1718 localabstract:minitouch
}
