"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const task_model_1 = require("../task.model");
class TaskStatusValidationPipe {
    transform(value) {
        if (!this.isValidStatus) {
            throw new common_1.BadRequestException(`Satus ${value} is not valid`);
        }
        return value;
    }
    isValidStatus(status) {
        return Object.values(task_model_1.TaskStatus).includes(status);
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map