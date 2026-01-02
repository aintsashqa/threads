import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ThreadService } from "./thread.service";

@Injectable()
export class ThreadWorker {
	private readonly logger = new Logger(ThreadWorker.name);

	constructor(private readonly threadService: ThreadService) {}

	@Cron(CronExpression.EVERY_5_MINUTES)
	async handleCleanupExpired(): Promise<void> {
		this.logger.log("Handling cleanup expired threads");
		await this.threadService.cleanupExpired();
	}
}
