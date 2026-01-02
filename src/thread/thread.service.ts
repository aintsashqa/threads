import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EntityManager, In, IsNull, Repository } from "typeorm";
import { REMOVED_THREADS_EVENT, THREAD_LIFETIME } from "./thread.contstants";
import { Thread } from "./entities/thread.entity";
import { CreatedThreadDto, CreateThreadDto } from "./dto";

@Injectable()
export class ThreadService {
	constructor(
		private readonly entityManager: EntityManager,
		@InjectRepository(Thread) private readonly threadsRepository: Repository<Thread>,
		private readonly eventEmitter: EventEmitter2,
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
		return await this.threadsRepository.find({
			where: { parentId: IsNull() },
			relations: { children: true, files: true },
		});
	}

	async findOneById(id: number): Promise<Thread> {
		const thread = await this.threadsRepository.findOne({
			where: { id },
			relations: { children: true, files: true },
		});
		if (!thread) {
			throw new NotFoundException();
		}

		return thread;
	}

	async cleanupExpired(): Promise<void> {
		const threads = await this.threadsRepository.findBy({ parentId: IsNull() });

		for (const thread of threads) {
			const children = await this.findByParentInDepths(thread.id);
			if (children.length === 0) {
				if (thread.timestamp < Date.now() - THREAD_LIFETIME) {
					await this.threadsRepository.softDelete({ id: thread.id });
					await this.eventEmitter.emitAsync(REMOVED_THREADS_EVENT, { threadIds: [thread.id] });
				}

				continue;
			}

			const hasAlive = children.some((child) => child.timestamp > Date.now() - THREAD_LIFETIME);
			if (hasAlive) {
				continue;
			}

			const threadIds = [...children.map((child) => child.id), thread.id];
			await this.threadsRepository.softDelete({ id: In(threadIds) });
			await this.eventEmitter.emitAsync(REMOVED_THREADS_EVENT, { threadIds });
		}
	}

	private async findByParentInDepths(parentId: number): Promise<Thread[]> {
		const threads = await this.threadsRepository.findBy({ parentId });
		if (threads.length === 0) {
			return [];
		}

		const result: Thread[] = [];
		for (const thread of threads) {
			const children = await this.findByParentInDepths(thread.id);
			result.push(...children, thread);
		}

		return result;
	}
}
