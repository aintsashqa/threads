import { Module } from "@nestjs/common";
import { ThreadModule } from "./thread/thread.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmSqliteConfig } from "./config/type-orm-sqlite.config";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmSqliteConfig), ThreadModule],
})
export class AppModule {}
