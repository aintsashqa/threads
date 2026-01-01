import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, Length, Min } from "class-validator";

export class CreateThreadDto {
	@ApiProperty()
	@Length(1, 500)
	readonly message: string;

	@ApiPropertyOptional({ type: Number, nullable: true })
	@Min(1)
	@IsOptional()
	readonly parentId: number | undefined | null;
}
