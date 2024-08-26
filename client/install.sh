# docker rm -f cousera

# docker rmi -f coursera-app-image

# docker build -t coursera-app-image .

# docker run -p 5001:5001 -p 5002:5002  --name cousera --restart always coursera-app-image

#!/bin/bash

# Function to remove Docker container
remove_container() {
    # Xóa container nếu tồn tại
    docker rm -f coursera-client 2>/dev/null || true
    # Xóa image nếu tồn tại
    docker rmi -f coursera-vite  2>/dev/null || true
}


rebuild_container() {
    # Xóa container nếu tồn tại
    docker rm -f coursera-client 2>/dev/null || true
    # Xóa image nếu tồn tại
    docker rmi -f coursera-vite 2>/dev/null || true
    # Xây dựng lại Docker image
    docker build -t coursera-vite .
    # Kiểm tra và chạy container
    if [ "$(docker ps -q -f name=coursera-client)" ]; then
        echo "Container coursera-client is already running."
    else
        docker run -p 5173:5173 --name coursera-client --restart always coursera-vite
    fi
}

build_container() {
    # Xây dựng Docker image
    docker build -t coursera-vite .
    # Kiểm tra và chạy container
    if [ "$(docker ps -q -f name=coursera-client)" ]; then
        echo "Container coursera-client is already running."
    else
        docker run -p 5173:5173 --name coursera-client --restart always coursera-vite
    fi
}
rebuild_container_sudo() {
    # Xóa container nếu tồn tại
    sudo docker rm -f coursera-client-sudo 2>/dev/null || true
    # Xóa image nếu tồn tại
    sudo docker rmi -f coursera-vite-sudo 2>/dev/null || true
    # Xây dựng lại Docker image
    sudo docker build -t coursera-vite-sudo .
    # Kiểm tra và chạy container
    if [ "$(sudo docker ps -q -f name=coursera-client)" ]; then
        echo "Container coursera-client-sudo is already running."
    else
        sudo docker run -p 80:5173 --name coursera-client-sudo --restart always coursera-vite-sudo
    fi
}
remove_container_sudo() {
    # Xóa container nếu tồn tại
    docker rm -f coursera-client-sudo 2>/dev/null || true
    # Xóa image nếu tồn tại
    docker rmi -f coursera-vite-sudo 2>/dev/null || true
}
# Menu chính
echo "What do you want to do?"
echo "1. Remove Docker container"
echo "2. Rebuild Docker container"
echo "3. Build Docker container"
echo "4. Build Docker container with sudo port 80"
echo "5. Remove Docker container with sudo port 80"

read -p "Please enter your choice [1-4]: " choice

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
  4)
    echo "Building Docker container with sudo..." 
    rebuild_container_sudo
    ;;
  5)
    echo "Removing Docker container with sudo..." 
    remove_container_sudo
    ;;
  *)
    echo "Invalid option, please select a number between 1 and 3."
    ;;
esac