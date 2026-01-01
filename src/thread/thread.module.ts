import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThreadService } from "./thread.service";
import { ThreadController } from "./thread.controller";
import { Thread } from "./entities/thread.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Thread])],
	controllers: [ThreadController],
	providers: [ThreadService],
})
export class ThreadModule {}
