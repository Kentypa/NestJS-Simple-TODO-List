import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TodosModule } from "./todos/todos.module";
import { LoggerMiddleware } from "./shared/middleware/logger.middleware";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import databaseConfig from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todos/entities/todo.entity";

@Module({
  imports: [
    TodosModule,
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
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
        entities: [Todo],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("todos");
  }
}
