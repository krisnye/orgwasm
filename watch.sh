#!/bin/bash

# when we get an interrupt or exit we kill all child processes
trap "kill 0" SIGINT SIGTERM EXIT

# start child processes in background
tsc -w &
nodemon -q -e js,wast ./test &

# wait for child process to end (they won't till we CTRL use +C)
wait