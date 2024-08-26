#!/bin/bash

# Hỏi người dùng nhập thông điệp commit
read -p "Nhập nội dung commit: " commit_message

# Thực hiện git add và commit
git add .
git commit -m "$commit_message"

# Hỏi người dùng nhập tên nhánh
read -p "Nhập tên nhánh để push: " branch_name

# Thực hiện git push lên nhánh được chỉ định
git push origin "$branch_name"
