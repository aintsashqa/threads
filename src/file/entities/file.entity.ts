import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Thread } from "src/thread/entities/thread.entity";

@Entity("files")
export class File {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	key: string;

	@ManyToOne(() => Thread, (thread) => thread.files)
	@JoinColumn({ name: "thread_id" })
	thread: Thread;

	@Column({ name: "thread_id" })
	threadId: number;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@DeleteDateColumn({ name: "deleted_at" })
	deletedAt: Date | null;

	constructor(from: Partial<File>) {
		Object.assign(this, from);
	}
}
