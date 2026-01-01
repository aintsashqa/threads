import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity({ name: "threads" })
@Tree("nested-set")
export class Thread {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	message: string;

	@Exclude()
	@TreeParent()
	parent: Thread | undefined | null;

	@Exclude()
	@TreeChildren()
	children: Thread[];

	@Expose()
	@ApiProperty({ type: [Number] })
	get replies(): number[] {
		return this.children.map((child) => child.id);
	}

	@Exclude()
	@Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@Expose()
	@ApiProperty()
	get timestamp(): number {
		return this.createdAt.getTime();
	}

	constructor(from: Partial<Thread>) {
		Object.assign(this, from);
	}

	reply(message: string): Thread {
		return new Thread({ message, parent: this });
	}
}
