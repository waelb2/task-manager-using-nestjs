import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { createTaskDTO } from './DTO/create-task.dto';
import { TaskStatus } from './task.model';
import { SearchFilterDTO } from './DTO/searchFilter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly TaskRepository: Repository<Task>,
  ) {}

  async getAllTasks(searchFilterDto: SearchFilterDTO): Promise<Task[]> {
    const { status, search } = searchFilterDto;

    const query = this.TaskRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const taskFound = await this.TaskRepository.findOne({
      where: { id: id },
    });
    if (!taskFound) {
      throw new NotFoundException(`Task with id : ${id} not found`);
    }
    return taskFound;
  }

  async createTask(createTaskDto: createTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = new Task();

    newTask.title = title;
    newTask.description = description;
    newTask.status = TaskStatus.OPEN;
    await this.TaskRepository.save(newTask);

    return newTask;
  }

  async deleteTask(id: number): Promise<void> {
    await this.getTaskById(id);
    this.TaskRepository.delete(id);
  }

  async updateTask(id: number, newStatus: TaskStatus): Promise<Task> {
    const taskFound = await this.getTaskById(id);
    taskFound.status = newStatus;
    return this.TaskRepository.save(taskFound);
  }
}
