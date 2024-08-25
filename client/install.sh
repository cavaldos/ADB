# docker rm -f cousera

# docker rmi -f coursera-app-image

# docker build -t coursera-app-image .

# docker run -p 5001:5001 -p 5002:5002  --name cousera --restart always coursera-app-image

#!/bin/bash

# Function to remove Docker container
remove_container() {
    docker rm -f coursera-client
    docker rmi -f coursera-app-image

}
rebuild_container() {
    docker rm -f cousera
    docker rmi -f coursera-vite
    docker build -t coursera-vite .
    docker run -p 81:5173   --name coursera-client --restart always coursera-vite
}
build_container() {
    docker build -t coursera-vite .
    docker run -p 81:5173   --name coursera-client --restart always coursera-vite
}



# Main menu
echo "What do you want to do?"
echo "1. Remove Docker container"
echo "2. Rebuild Docker container"
echo "3. Build Docker container"

read -p "Please enter your choice [1-2]: " choice

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
    echo "Invalid option, please select a number between 1 and 5."
    ;;
esac
