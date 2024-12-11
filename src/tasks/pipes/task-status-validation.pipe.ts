import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!this.isValidStatus) {
      throw new BadRequestException(`Satus ${value} is not valid`);
    }
    return value;
  }
  private isValidStatus(status: any): status is TaskStatus {
    return Object.values(TaskStatus).includes(status);
  }
}
