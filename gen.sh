#!/usr/bin/env bash

# 生成 user_pb.js 和 user_grpc_pb.js
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./gen \
  --grpc_out=grpc_js:./gen \
  --plugin=protoc-gen-grpc=$(which grpc_tools_node_protoc_plugin) \
  ./user.proto

# 生成 d.ts 定义
protoc \
  --plugin=protoc-gen-ts=$(which protoc-gen-ts) \
  --ts_out=grpc_js:./gen \
  ./user.proto
