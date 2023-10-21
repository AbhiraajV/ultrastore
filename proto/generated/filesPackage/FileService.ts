// Original file: proto/files.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { PingRequest as _filesPackage_PingRequest, PingRequest__Output as _filesPackage_PingRequest__Output } from '../filesPackage/PingRequest';
import type { PongResponse as _filesPackage_PongResponse, PongResponse__Output as _filesPackage_PongResponse__Output } from '../filesPackage/PongResponse';

export interface FileServiceClient extends grpc.Client {
  PingPong(argument: _filesPackage_PingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_filesPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  PingPong(argument: _filesPackage_PingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_filesPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  PingPong(argument: _filesPackage_PingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_filesPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  PingPong(argument: _filesPackage_PingRequest, callback: grpc.requestCallback<_filesPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  pingPong(argument: _filesPackage_PingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_filesPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  pingPong(argument: _filesPackage_PingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_filesPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  pingPong(argument: _filesPackage_PingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_filesPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  pingPong(argument: _filesPackage_PingRequest, callback: grpc.requestCallback<_filesPackage_PongResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface FileServiceHandlers extends grpc.UntypedServiceImplementation {
  PingPong: grpc.handleUnaryCall<_filesPackage_PingRequest__Output, _filesPackage_PongResponse>;
  
}

export interface FileServiceDefinition extends grpc.ServiceDefinition {
  PingPong: MethodDefinition<_filesPackage_PingRequest, _filesPackage_PongResponse, _filesPackage_PingRequest__Output, _filesPackage_PongResponse__Output>
}
