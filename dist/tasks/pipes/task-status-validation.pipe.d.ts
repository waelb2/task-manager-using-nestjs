import { PipeTransform } from '@nestjs/common';
export declare class TaskStatusValidationPipe implements PipeTransform {
    transform(value: any): any;
    private isValidStatus;
}
