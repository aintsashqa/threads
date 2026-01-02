import { DataSource, EntitySubscriberInterface, EventSubscriber, LoadEvent } from "typeorm";
import { Injectable } from "@nestjs/common";
import { S3ClientService } from "src/shared/services/s3-client.service";
import { Thread } from "./thread.entity";

@Injectable()
@EventSubscriber()
export class ThreadSubscriber implements EntitySubscriberInterface<Thread> {
	constructor(
		dataSource: DataSource,
		private readonly s3ClientService: S3ClientService,
	) {
		dataSource.subscribers.push(this);
	}

	listenTo(): typeof Thread {
		return Thread;
	}

	afterLoad(thread: Thread, event: LoadEvent<Thread> | undefined): void {
		thread.fileUrls = thread.files?.map((file) => this.s3ClientService.getPublicUrl(file.key)) ?? [];
	}
}
