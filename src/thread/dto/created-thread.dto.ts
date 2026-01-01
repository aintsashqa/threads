import { ApiProperty } from "@nestjs/swagger";

export class CreatedThreadDto {
	@ApiProperty()
	readonly threadId: number;
}
