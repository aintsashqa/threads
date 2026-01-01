import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

const factory = (configService: ConfigService): TypeOrmModuleOptions => ({
	type: "better-sqlite3",
	database: configService.getOrThrow<string>("DATABASE_URL"),
	autoLoadEntities: true,
	synchronize: true,
});

export const typeOrmSqliteConfig: TypeOrmModuleAsyncOptions = {
	inject: [ConfigService],
	useFactory: factory,
};
