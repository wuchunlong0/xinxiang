#!/usr/bin/env bash 

pushd `dirname $0` > /dev/null
BASE_DIR=`pwd -P`
popd > /dev/null

#############
# Functions
#############
function logging {
    echo "[INFO] $*"
}

function build_venv {
    pip3 install virtualenv
    if [ ! -d env ]; then
        virtualenv env
    fi
    . env/bin/activate

    pip3 install -r requirements.txt
}

function rebuild_db {
	logging "Clean"
	rm -rf "${BASE_DIR}/mysite/db.sqlite3"
	rm -rf "${BASE_DIR}/mysite/guestbook/migrations/0001_initial.py"
	ls "${BASE_DIR}/mysite/guestbook/migrations/"
	logging "migrate"
	python "${BASE_DIR}/mysite/manage.py" "migrate"
	logging "makemigrations" "guestbook"
	python "${BASE_DIR}/mysite/manage.py" "makemigrations" "guestbook"
	logging "migrate"
	python "${BASE_DIR}/mysite/manage.py" "migrate"
	logging "initdb.py"
	python "${BASE_DIR}/mysite/initdb.py"
}


function launch_webapp {
    cd ${BASE_DIR}/mysite
    python "manage.py" "runserver" "8000"
}

#############
# Main
#############
cd ${BASE_DIR}
OPT_ENV_FORCE=$1

if [ "${OPT_ENV_FORCE}x" == "-fx" ];then
    python "${BASE_DIR}/manage.py" "clean"
fi

python "${BASE_DIR}/manage.py" "prepare"
build_venv

if [ "${OPT_ENV_FORCE}x" == "-ix" ];then
    rebuild_db
fi

cp ${BASE_DIR}/mysite/db.sqlite3 ${BASE_DIR}/mysite/demo.sqlite3
launch_webapp 
