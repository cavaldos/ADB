
# Sử dụng image node chính thức
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build dự án (nếu cần thiết)
RUN npm run build

# Mở cổng 5173 cho Vite (cổng mặc định)
EXPOSE 5173

# Lệnh khởi động Vite server
CMD ["npm", "run", "dev"]
