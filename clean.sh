CAP_PIDS=$(adb shell ps|grep mini|awk '{print $2}')
for cap_pid in $CAP_PIDS
	do
		adb shell kill -9 $cap_pid
	done
LIST=$(ps c|grep node|awk '{print $1}')
echo $LIST
for pid in $LIST
	do
		kill -9 $pid
	done

