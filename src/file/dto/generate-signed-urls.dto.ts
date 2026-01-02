import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max } from "class-validator";
import { MAX_FILES_COUNT } from "../file.constants";

export class GenerateSignedUrlsDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly threadId: number;

	@ApiProperty()
	@IsNotEmpty()
	@Max(MAX_FILES_COUNT)
	readonly filesCount: number;
}
