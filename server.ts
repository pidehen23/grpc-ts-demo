import * as grpc from "@grpc/grpc-js";
import { IUserServer, UserService } from "./gen/user_grpc_pb";
import messages from "./gen/user_pb";

// User Service 的实现
const userServiceImpl: IUserServer = {
  // 实现登录接口
  login(call, callback) {
    const { request } = call;
    const username = request.getUsername();
    const password = request.getPassword();

    const response = new messages.LoginResponse();
    response.setAccessToken(`username = ${username}; password = ${password}`);
    response.setExpires(7200);
    callback(null, response);
  },
};

function main() {
  const server = new grpc.Server();

  // UserService 是定义，UserImpl 是实现
  server.addService(UserService, userServiceImpl);
  server.bindAsync(
    "0.0.0.0:8081",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("grpc server started");
    }
  );
}

main();
