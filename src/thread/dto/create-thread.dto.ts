import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { THREAD_MESSAGE_MAX_LENGTH } from "../thread.contstants";

export class CreateThreadDto {
	@ApiProperty()
	@MaxLength(THREAD_MESSAGE_MAX_LENGTH)
	@IsNotEmpty()
	readonly message: string;

	@ApiPropertyOptional({ type: Number, nullable: true })
	@IsOptional()
	readonly parentId: number | undefined | null;
}
