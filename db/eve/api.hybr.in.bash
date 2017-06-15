#!/bin/bash
# chkconfig: 2345 20 80
# description: Description comes here....

# Source function library.
. /etc/init.d/functions

start() {
    # code to start app comes here
    # example: daemon program_name &
        /hybr/db/eve/hybr_api.py &
        /hybr/db/eve/hybr_api_swagger.py &

}

stop() {
    # code to stop app comes here
    # example: killproc program_name
        # killproc "/hybr/db/eve/run.py"
        PID=` ps -ef | grep -i hybr_api.py | grep -v grep  | awk '{print $2}'`
        kill -9 $PID
        PID=` ps -ef | grep -i hybr_api_swagger.py  | grep -v grep  | awk '{print $2}'`
        kill -9 $PID
}

case "$1" in

    start)
       start
       ;;
    stop)
       stop
       ;;
    restart)
       stop
       start
       ;;
    status)
       # code to check status of app comes here
       # example: status program_name
       ;;
    *)
       echo "Usage: $0 {start|stop|status|restart}"
esac
