"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const todos_module_1 = require("./todos/todos.module");
const logger_middleware_1 = require("./shared/middleware/logger.middleware");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./config/configuration"));
const database_config_1 = __importDefault(require("./config/database.config"));
const typeorm_1 = require("@nestjs/typeorm");
const todo_entity_1 = require("./todos/entities/todo.entity");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes("todos");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            todos_module_1.TodosModule,
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default, database_config_1.default],
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("database.host"),
                    port: configService.get("database.port"),
                    username: configService.get("database.user"),
                    password: configService.get("database.password"),
                    database: configService.get("database.name"),
                    entities: [todo_entity_1.Todo],
                    synchronize: true,
                }),
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map