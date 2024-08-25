#!/bin/bash

# Function to remove Docker container
remove_container() {
    # Xóa container nếu tồn tại
    sudo docker rm -f coursera-client 2>/dev/null || true
    # Xóa image nếu tồn tại
    sudo docker rmi -f coursera-app-image 2>/dev/null || true
}

rebuild_container() {
    # Xóa container nếu tồn tại
    sudo docker rm -f coursera-client 2>/dev/null || true
    # Xóa image nếu tồn tại
    sudo docker rmi -f coursera-vite 2>/dev/null || true
    # Xây dựng lại Docker image
    sudo docker build -t coursera-vite .
    # Kiểm tra và chạy container
    if [ "$(sudo docker ps -q -f name=coursera-client)" ]; then
        echo "Container coursera-client is already running."
    else
        sudo docker run -p 80:5173 --name coursera-client --restart always coursera-vite
    fi
}

build_container() {
    # Xây dựng Docker image
    sudo docker build -t coursera-vite .
    # Kiểm tra và chạy container
    if [ "$(sudo docker ps -q -f name=coursera-client)" ]; then
        echo "Container coursera-client is already running."
    else
        sudo docker run -p 80:5173 --name coursera-client --restart always coursera-vite
    fi
}

# Menu chính
echo "What do you want to do?"
echo "1. Remove Docker container"
echo "2. Rebuild Docker container"
echo "3. Build Docker container"

read -p "Please enter your choice [1-3]: " choice

case $choice in
  1)
    echo "Removing Docker container..."
    remove_container
    ;;
  2)
    echo "Rebuilding Docker container..."
    rebuild_container
    ;;
  3)
    echo "Building Docker container..." 
    build_container
    ;;
  *)
    echo "Invalid option, please select a number between 1 and 3."
    ;;
esac
