# 第一阶段：构建阶段
FROM node:20.18.0 AS builder

# 安装构建工具
RUN apt-get update && apt-get install -y build-essential python3

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 生成 Prisma Client
RUN npx prisma generate

# 第二阶段：生产阶段
FROM node:20.18.0

# 设置工作目录
WORKDIR /app

# 从构建阶段复制已安装的依赖和项目文件
COPY --from=builder /app .

# 启动应用
CMD ["npm", "start"]