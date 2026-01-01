import { ValidationPipeOptions } from "@nestjs/common";

export const validationConfig: ValidationPipeOptions = {
	transform: true,
	transformOptions: { enableImplicitConversion: true },
	whitelist: true,
};
