import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "threads" })
export class Thread {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	message: string;

	@Exclude()
	@ManyToOne(() => Thread, (thread) => thread.children, { nullable: true })
	@JoinColumn({ name: "parent_id" })
	parent: Thread | undefined | null;

	@Exclude()
	@Column({ name: "parent_id", nullable: true })
	parentId: number | undefined | null;

	@Exclude()
	@OneToMany(() => Thread, (thread) => thread.parent)
	children: Thread[];

	@Expose()
	@ApiProperty({ type: [Number] })
	get replies(): number[] {
		return this.children.map((child) => child.id);
	}

	@Exclude()
	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@Expose()
	@ApiProperty()
	get timestamp(): number {
		return this.createdAt.getTime();
	}

	@Exclude()
	@DeleteDateColumn({ name: "deleted_at" })
	deletedAt: Date | null;

	constructor(from: Partial<Thread>) {
		Object.assign(this, from);
	}

	reply(message: string): Thread {
		return new Thread({ message, parent: this });
	}
}
