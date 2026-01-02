import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { typeOrmSqliteConfig } from "./config/type-orm-sqlite.config";
import { ThreadModule } from "./thread/thread.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(typeOrmSqliteConfig),
		ScheduleModule.forRoot(),
		ThreadModule,
	],
})
export class AppModule {}
