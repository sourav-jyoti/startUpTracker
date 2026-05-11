#!/bin/bash

# Define variables
CONTAINER_NAME="startuptracker-mysql"
DB_NAME="startuptracker"
DB_USER="root"
DB_PASS="root"
PORT="3306"

echo "Starting MySQL Docker container..."

# Check if a container with the same name already exists
if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "A container named ${CONTAINER_NAME} already exists."
    
    # Check if it is running
    if [ "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then
        echo "The container is already running."
    else
        echo "Starting the existing container..."
        docker start ${CONTAINER_NAME}
    fi
else
    # Run a new MySQL container
    echo "Creating and starting a new MySQL container..."
    docker run --name ${CONTAINER_NAME} \
        -e MYSQL_ROOT_PASSWORD=${DB_PASS} \
        -e MYSQL_DATABASE=${DB_NAME} \
        -p ${PORT}:3306 \
        -d mysql:latest
        
    echo "Waiting for MySQL to initialize..."
    sleep 10
fi

echo ""
echo "✅ MySQL is ready!"
echo "Database: ${DB_NAME}"
echo "Username: ${DB_USER}"
echo "Password: ${DB_PASS}"
echo "Port: ${PORT}"
echo ""
echo "You can now run your migrations using:"
echo "php artisan migrate"
