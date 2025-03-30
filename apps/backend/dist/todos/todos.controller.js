"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
const add_todo_dto_1 = require("./dto/add-todo.dto");
const update_todo_dto_1 = require("./dto/update-todo.dto");
const get_todo_dto_1 = require("./dto/get-todo.dto");
const http_exception_filter_1 = require("../shared/filters/http-exception.filter");
const swagger_1 = require("@nestjs/swagger");
let TodosController = class TodosController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getTodos() {
        return this.todoService.get();
    }
    async addTodo(addTodo) {
        return this.todoService.add(addTodo);
    }
    async removeTodo(id) {
        return this.todoService.remove(id);
    }
    async updateTodo(id, updatedInfo) {
        return this.todoService.update(id, updatedInfo);
    }
};
exports.TodosController = TodosController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get array of todos" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Array of todos",
        type: [get_todo_dto_1.GetTodoDto],
    }),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getTodos", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Add todo to database" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Todo created successfully",
    }),
    (0, swagger_1.ApiBody)({
        type: add_todo_dto_1.AddTodoDto,
        description: "Todo task information",
    }),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_todo_dto_1.AddTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "addTodo", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: "Remove todo from database" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todo removed successfully",
    }),
    (0, swagger_1.ApiQuery)({
        name: "id",
        description: "ID of todo",
        type: "number",
        example: 1,
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "removeTodo", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: "Update todo from database" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todo updated successfully",
    }),
    (0, swagger_1.ApiQuery)({
        name: "id",
        description: "ID of todo",
        type: "number",
        example: 1,
    }),
    (0, swagger_1.ApiBody)({
        type: update_todo_dto_1.UpdateTodoDto,
        description: "Updated todo information",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_todo_dto_1.UpdateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "updateTodo", null);
exports.TodosController = TodosController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("todos"),
    (0, common_1.Controller)("todos"),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
//# sourceMappingURL=todos.controller.js.map