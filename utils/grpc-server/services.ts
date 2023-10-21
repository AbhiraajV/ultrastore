const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { ProtoGrpcType } = require("@/proto/generated/files");
const {
  FileServiceHandlers,
} = require("@/proto/generated/filesPackage/FileService");

const PORT = 3001;
const PROTO_FILE = "./proto/files.proto";
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const filesPackage = grpcObject.filesPackage;

function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err: any, port: any) => {
      if (err) {
        console.error({ error: err });
        return;
      }
      console.log(`server started on ${port}`);
      server.start();
    }
  );
}

function getServer() {
  const server = new grpc.Server();
  server.addService(filesPackage.FileService.service, {
    PingPong: (req: any, res: any) => {},
  });

  return server;
}

main();
