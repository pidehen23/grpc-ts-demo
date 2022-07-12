#!/usr/bin/env bash

rm -rf gen

mkdir gen

# 生成 user_pb.js 和 user_grpc_pb.js
npx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./gen \
  --grpc_out=grpc_js:./gen \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  ./user.proto

# 生成 d.ts 定义
npx protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=grpc_js:./gen \
  ./user.proto
