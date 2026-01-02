import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { REMOVED_THREADS_EVENT } from "src/thread/thread.contstants";
import { RemovedThreadsEvent } from "src/thread/events";
import { FileService } from "./file.service";

@Injectable()
export class FileConsumer {
	private readonly logger = new Logger(FileConsumer.name);

	constructor(private readonly fileService: FileService) {}

	@OnEvent(REMOVED_THREADS_EVENT, { async: true })
	async handleRemoveFiles({ threadIds }: RemovedThreadsEvent) {
		this.logger.log(`Handling remove files for threads ${threadIds}`);
		await this.fileService.removeFiles(threadIds);
	}
}
