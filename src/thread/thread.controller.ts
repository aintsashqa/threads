import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
} from "@nestjs/swagger";
import { ThreadService } from "./thread.service";
import { Thread } from "./entities/thread.entity";
import { CreatedThreadDto, CreateThreadDto } from "./dto";

@Controller("threads")
@UseInterceptors(ClassSerializerInterceptor)
@ApiInternalServerErrorResponse({ description: "Internal server error" })
export class ThreadController {
	constructor(private readonly threadService: ThreadService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({ type: CreatedThreadDto })
	@ApiBadRequestResponse({ description: "Bad request" })
	@ApiNotFoundResponse({ description: "Not found" })
	async create(@Body() dto: CreateThreadDto): Promise<CreatedThreadDto> {
		return this.threadService.create(dto);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: [Thread] })
	async findAll(): Promise<Thread[]> {
		return this.threadService.findAll();
	}

	@Get(":threadId")
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: Thread })
	@ApiNotFoundResponse({ description: "Not found" })
	async findOne(@Param("threadId") threadId: number): Promise<Thread> {
		return this.threadService.findOneById(threadId);
	}
}
