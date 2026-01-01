import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { validationConfig } from "./config/validation.config";
import { swaggerConfig } from "./config/swagger.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe(validationConfig));

	const factory = () => SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("swagger", app, factory);

	await app.listen(50051);
}
bootstrap();
