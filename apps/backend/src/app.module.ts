import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TodosModule } from "./todos/todos.module";
import { LoggerMiddleware } from "./shared/middleware/logger.middleware";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todos/entities/todo.entity";
import { UserModule } from "./user/user.module";
import { User } from "./shared/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import jwtConfig from "./config/jwt.config";
import encryptionConfig from "./config/encription.config";
import configuration from "./config/configuration.config";
import databaseConfig from "./config/database.config";
import { Achievements } from "./achievements/entities/achievements.entity";
import { Market } from "./market/entities/market.entity";

@Module({
  imports: [
    TodosModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration, databaseConfig, jwtConfig, encryptionConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.user"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.name"),
        entities: [Todo, User, Achievements, Market],
        synchronize: false,
        migrations: ["dist/migrations/*.js"],
        migrationsRun: true,
      }),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("todos");
  }
}
