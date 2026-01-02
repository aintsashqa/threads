import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { typeOrmSqliteConfig } from "./config/type-orm-sqlite.config";
import { ThreadModule } from "./thread/thread.module";
import { FileModule } from "./file/file.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(typeOrmSqliteConfig),
		ScheduleModule.forRoot(),
		EventEmitterModule.forRoot({ global: true }),
		ThreadModule,
		FileModule,
	],
})
export class AppModule {}
