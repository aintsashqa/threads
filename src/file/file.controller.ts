import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
	ApiConflictResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { FileService } from "./file.service";
import { GenerateSignedUrlsDto } from "./dto";

@Controller("files")
@ApiInternalServerErrorResponse({ description: "Internal server error" })
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: [String] })
	@ApiConflictResponse({ description: "Conflict" })
	@ApiUnprocessableEntityResponse({ description: "Unprocessable entity" })
	async generateSignedUrls(@Body() dto: GenerateSignedUrlsDto): Promise<string[]> {
		return await this.fileService.generateSignedUrls(dto);
	}
}
