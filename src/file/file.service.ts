import { ConflictException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, In, Repository } from "typeorm";
import { S3ClientService } from "src/shared/services/s3-client.service";
import { Thread } from "src/thread/entities/thread.entity";
import { File as FileEntity } from "./entities/file.entity";
import { GenerateSignedUrlsDto } from "./dto";

@Injectable()
export class FileService {
	constructor(
		private readonly entityManager: EntityManager,
		@InjectRepository(FileEntity) private readonly filesRepository: Repository<FileEntity>,
		@InjectRepository(Thread) private readonly threadsRepository: Repository<Thread>,
		private readonly s3ClientService: S3ClientService,
	) {}

	async generateSignedUrls(dto: GenerateSignedUrlsDto): Promise<string[]> {
		const threadExists = await this.threadsRepository.existsBy({ id: dto.threadId });
		if (!threadExists) {
			throw new UnprocessableEntityException();
		}

		const filesExists = await this.filesRepository.existsBy({ threadId: dto.threadId });
		if (filesExists) {
			throw new ConflictException();
		}

		const files: FileEntity[] = [];
		for (let i = 0; i < dto.filesCount; i++) {
			const file = new FileEntity({ key: crypto.randomUUID(), threadId: dto.threadId });
			files.push(file);
		}

		return this.entityManager.transaction(async (manager) => {
			await manager.save(files);

			return await Promise.all(files.map((file) => this.s3ClientService.createSignedUrl(file.key)));
		});
	}

	async removeFiles(threadIds: number[]): Promise<void> {
		const files = await this.filesRepository.findBy({ threadId: In(threadIds) });
		if (files.length === 0) {
			return;
		}

		await this.filesRepository.softDelete({ threadId: In(threadIds) });
	}
}
