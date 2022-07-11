// client.ts

import * as grpc from "@grpc/grpc-js";
import { UserClient } from "./gen/user_grpc_pb";
import messages from "./gen/user_pb";

const client = new UserClient(
  "localhost:8081",
  grpc.credentials.createInsecure()
);

// 发起登录请求
const login = () => {
  return new Promise((resolve, reject) => {
    const request = new messages.LoginRequest();
    request.setUsername("zhang");
    request.setPassword("123456");

    client.login(request, function (err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response.toObject());
      }
    });
  });
};

async function main() {
  const data = await login();
  console.log(data);
}

main();
