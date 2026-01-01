import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder().setTitle("Threads API").setVersion("1.0.0").build();
