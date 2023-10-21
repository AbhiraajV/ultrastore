import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { FileServiceClient as _filesPackage_FileServiceClient, FileServiceDefinition as _filesPackage_FileServiceDefinition } from './filesPackage/FileService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  filesPackage: {
    FileService: SubtypeConstructor<typeof grpc.Client, _filesPackage_FileServiceClient> & { service: _filesPackage_FileServiceDefinition }
    PingRequest: MessageTypeDefinition
    PongResponse: MessageTypeDefinition
  }
}

