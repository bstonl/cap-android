LIST=$(ps|grep ^'node|sh'|awk '{print $1}')
echo $LIST
for pid in $LIST
	do
		kill -9 $pid
	done

