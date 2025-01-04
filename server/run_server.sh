#!/bin/bash

# Create the log directory if it doesn't exist
LOG_DIR="log"
mkdir -p "$LOG_DIR"

# Generate a timestamp for the log file name
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOG_DIR/log-$TIMESTAMP.log"

# Run the Spring Boot application using Maven
echo "Starting Spring Boot application..."
echo "Logs will be written to $LOG_FILE"

nohup mvn spring-boot:run > "$LOG_FILE" 2>&1 &
# Notify user on exit
echo "Spring Boot application stopped. Logs are saved in $LOG_FILE."
