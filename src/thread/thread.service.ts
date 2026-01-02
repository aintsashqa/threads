import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, IsNull, Repository } from "typeorm";
import { Thread } from "./entities/thread.entity";
import { CreatedThreadDto, CreateThreadDto } from "./dto";

@Injectable()
export class ThreadService {
	constructor(
		private readonly entityManager: EntityManager,
		@InjectRepository(Thread) private readonly threadsRepository: Repository<Thread>,
	) {}

	async create(dto: CreateThreadDto): Promise<CreatedThreadDto> {
		let parent: Thread | null = null;

		if (dto.parentId) {
			parent = await this.threadsRepository.findOneBy({ id: dto.parentId });
			if (!parent) {
				throw new NotFoundException();
			}
		}

		const thread = parent ? parent.reply(dto.message) : new Thread(dto);
		await this.entityManager.save(thread);

		return { threadId: thread.id };
	}

	async findAll(): Promise<Thread[]> {
		return this.threadsRepository.find({ where: { parent: IsNull() }, relations: { children: true } });
	}

	async findOneById(id: number): Promise<Thread> {
		const thread = await this.threadsRepository.findOne({ where: { id }, relations: { children: true } });
		if (!thread) throw new NotFoundException();

		return thread;
	}
}
