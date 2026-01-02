import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { S3ClientService } from "src/shared/services/s3-client.service";
import { ThreadController } from "./thread.controller";
import { ThreadService } from "./thread.service";
import { ThreadWorker } from "./thread.worker";
import { Thread } from "./entities/thread.entity";
import { ThreadSubscriber } from "./entities/thread.entity-subscriber";

@Module({
	imports: [TypeOrmModule.forFeature([Thread])],
	controllers: [ThreadController],
	providers: [S3ClientService, ThreadService, ThreadWorker, ThreadSubscriber],
})
export class ThreadModule {}
