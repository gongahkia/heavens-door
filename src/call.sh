#!/bin/bash

echo -e "Welcome to Heaven's Door, the locally hosted todo.txt notepad.\nReport any issues to @gongahkia on Github,\n"
read -p "[Enter] to continue"

if command -v python3 &> /dev/null && python3 -m http.server --help &> /dev/null; then
    echo "Python3 with http.server is already installed."
    SERVER_CMD="python3 -m http.server"
else
    if command -v npm &> /dev/null && npm list -g http-server &> /dev/null; then
        echo "npm with http-server is already installed."
        SERVER_CMD="http-server"
    else
        echo "Do you want to run the local server through NodeJS or Python?\nEnter [N]ode or [P]ython"
        read -r choice
        if [[ "$choice" == "p" ]]; then
            echo "Installing Python3 and http.server..."
            sudo apt-get update
            sudo apt-get install -y python3
            SERVER_CMD="python3 -m http.server"
        elif [[ "$choice" == "n" ]]; then
            echo "Installing Node.js and http-server..."
            sudo apt-get update
            sudo apt-get install -y nodejs npm
            sudo npm install -g http-server
            SERVER_CMD="http-server"
        else
            echo "Invalid choice. Exiting."
            exit 1
        fi
    fi
fi

echo "Starting the local server..."
$SERVER_CMD &
echo "Heaven's Door notepad is ready at: http://localhost:8000"