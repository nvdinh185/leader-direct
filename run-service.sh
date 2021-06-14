#! /bin/bash
WORK_DIR=$PWD
LOG_FILE=$WORK_DIR/logs/socket
CLASSPATH=$WORK_DIR/server-leader-direct-1.0.js
pid_file=$WORK_DIR/service.pid
TIMESTAMP=`date '+%Y%m%d_%H%M'`

RUNNING=0
if [ -f $pid_file ]; then
	pid=`cat $pid_file`
	if [ "x$pid" != "x" ] && kill -0 $pid 2>/dev/null; then
		RUNNING=1
	fi
fi

start()

{
	cd $WORK_DIR
	if [ $RUNNING -eq 1 ]; then
		echo "service already started"
	else
		node $CLASSPATH > $LOG_FILE.$TIMESTAMP.log &
		echo $! > $pid_file
		echo "service started"
	fi
}

stop()
{
	if [ $RUNNING -eq 1 ]; then
		kill -9 $pid
		echo "service stopped"
	else
		echo "service not running"
	fi
}

restart()
{
	stop
	sleep 5
	start
}


case "$1" in

	'start')
		start
		;;

	'stop')
		stop
		;;

	'restart')
		restart
		;;

	*)
		echo "Usage: $0 {  start | stop | restart  }"
		exit 1
		;;
esac

exit 0
