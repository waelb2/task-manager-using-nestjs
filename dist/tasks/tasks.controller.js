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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const task_model_1 = require("./task.model");
const create_task_dto_1 = require("./DTO/create-task.dto");
const task_status_validation_pipe_1 = require("./pipes/task-status-validation.pipe");
const searchFilter_dto_1 = require("./DTO/searchFilter.dto");
let TasksController = class TasksController {
    constructor(TasksService) {
        this.TasksService = TasksService;
    }
    getTaskById(id) {
        return this.TasksService.getTaskById(id);
    }
    createTask(createTaskDTO) {
        return this.TasksService.createTask(createTaskDTO);
    }
    deleteTask(id) {
        return this.TasksService.deleteTask(id);
    }
    getAllTasks(searchFilterDTO) {
        return this.TasksService.getAllTasks(searchFilterDTO);
    }
    updateStatus(id, status) {
        return this.TasksService.updateTask(id, status);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.createTaskDTO]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchFilter_dto_1.SearchFilterDTO]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Patch)('/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status', task_status_validation_pipe_1.TaskStatusValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateStatus", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map