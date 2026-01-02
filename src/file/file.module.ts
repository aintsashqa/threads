import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { S3ClientService } from "src/shared/services/s3-client.service";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { File as FileEntity } from "./entities/file.entity";
import { Thread } from "src/thread/entities/thread.entity";
import { FileConsumer } from "./file.consumer";

@Module({
	imports: [TypeOrmModule.forFeature([FileEntity, Thread])],
	controllers: [FileController],
	providers: [S3ClientService, FileService, FileConsumer],
})
export class FileModule {}
