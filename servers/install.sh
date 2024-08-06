docker rm -f cousera

docker rmi -f coursera-app-image

docker build -t coursera-app-image .

docker run -p 5001:5001 -p 5002:5002  --name cousera --restart always coursera-app-image