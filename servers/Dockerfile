# Sử dụng image chính thức của Node.js phiên bản được chỉ định trong package.json
FROM node:18.12.1

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json (hoặc yarn.lock nếu bạn sử dụng Yarn)
# COPY package*.json ./
COPY yarn.lock ./

# Cài đặt các phụ thuộc
RUN yarn install --frozen-lockfile

# Copy toàn bộ mã nguồn của dự án vào thư mục làm việc trong container
COPY . .
COPY .env ./

# Biên dịch ứng dụng TypeScript sang JavaScript
RUN yarn build

# Mở cổng mà ứng dụng sẽ chạy trên đó
EXPOSE 3000


# Chạy ứng dụng
CMD ["node", "dist/server.js"]



#  docker build -t coursera-app-image .
# docker run -p 5001:5001 -p 5002:5002  --name cousera coursera-app-image