import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { createTaskDTO } from './DTO/create-task.dto';
import { TaskStatus } from './task.model';
import { SearchFilterDTO } from './DTO/searchFilter.dto';
export declare class TasksService {
    private readonly TaskRepository;
    constructor(TaskRepository: Repository<Task>);
    getAllTasks(searchFilterDto: SearchFilterDTO): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(createTaskDto: createTaskDTO): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    updateTask(id: number, newStatus: TaskStatus): Promise<Task>;
}
