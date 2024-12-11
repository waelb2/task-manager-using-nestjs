import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.model';
import { createTaskDTO } from './DTO/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Response } from 'express';
import { Task } from './task.entity';
import { SearchFilterDTO } from './DTO/searchFilter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.TasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: createTaskDTO): Promise<Task> {
    return this.TasksService.createTask(createTaskDTO);
  }
  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.TasksService.deleteTask(id);
  }

  @Get()
  getAllTasks(
    @Query(ValidationPipe) searchFilterDTO: SearchFilterDTO,
  ): Promise<Task[]> {
    return this.TasksService.getAllTasks(searchFilterDTO);
  }
  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.TasksService.updateTask(id, status);
  }
}
