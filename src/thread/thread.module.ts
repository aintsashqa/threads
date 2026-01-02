import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThreadController } from "./thread.controller";
import { ThreadService } from "./thread.service";
import { ThreadWorker } from "./thread.worker";
import { Thread } from "./entities/thread.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Thread])],
	controllers: [ThreadController],
	providers: [ThreadService, ThreadWorker],
})
export class ThreadModule {}
