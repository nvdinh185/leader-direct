# Hướng dẫn tạo máy chủ API tự động bằng thư viện chuẩn cng-auto-server

## Cài đặt thư viện đã chuẩn hóa

```sh

npm i cng-auto-server@latest cng-node-js-utils@latest node-js-orm@latest client-socket-nodejs@latest sqlite3

npm i cng-auto-server@latest sqlite3

```

## Chạy đồng bộ code chuẩn về cho máy chủ

```sh

# Chạy tự động tất cả
node ./sync-libs/create-test.js

# copy mẫu server sang dự án mới nhất
node ./sync-libs

```