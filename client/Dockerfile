# Sử dụng image node chính thức
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và yarn.lock vào thư mục làm việc
# COPY package*.json ./
COPY yarn.lock ./

# Cài đặt các dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build dự án (nếu cần thiết)
RUN yarn build

# Mở cổng 5173 cho Vite (cổng mặc định)
EXPOSE 5173

# Lệnh khởi động Vite server
CMD ["yarn", "preview"]
