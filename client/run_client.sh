#!/bin/bash

# Create the log directory if it doesn't exist
LOG_DIR="log"
mkdir -p "$LOG_DIR"

# Generate a timestamp for the log file name
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOG_DIR/log-$TIMESTAMP.log"

# Serve the React app using 'serve', redirect logs to the file, and run in the background
echo "Starting the React app..."
echo "Logs are being written to $LOG_FILE"
nohup serve -s build > "$LOG_FILE" 2>&1 &

# Capture the process ID of the 'serve' command
SERVE_PID=$!
echo "React app is being served with PID $SERVE_PID."

# Optionally provide commands to manage the process
echo "Use the following commands to manage the app:"
echo "  - View logs: tail -f $L"

