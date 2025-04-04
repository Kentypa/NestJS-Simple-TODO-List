"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const express_session_1 = __importDefault(require("express-session"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: `http://localhost:${configService.get("frontend.port")}`,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("TODOS API")
        .setDescription("Todos api description")
        .setVersion("1.0")
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, documentFactory);
    app.use((0, express_session_1.default)({
        secret: "my-secret",
        resave: false,
        saveUninitialized: false,
    }));
    await app.listen(configService.get("backend.port"));
}
bootstrap();
//# sourceMappingURL=main.js.map