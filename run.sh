sh clean.sh && sh init.sh & {
	sleep 1
	sh forward.sh 
} & {
	sleep 2
	sh start-web.sh
} & {
	sleep 1
	sh touch.sh
}
