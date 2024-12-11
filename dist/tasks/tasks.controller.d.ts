import { TasksService } from './tasks.service';
import { TaskStatus } from './task.model';
import { createTaskDTO } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { SearchFilterDTO } from './DTO/searchFilter.dto';
export declare class TasksController {
    private TasksService;
    constructor(TasksService: TasksService);
    getTaskById(id: number): Promise<Task>;
    createTask(createTaskDTO: createTaskDTO): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    getAllTasks(searchFilterDTO: SearchFilterDTO): Promise<Task[]>;
    updateStatus(id: number, status: TaskStatus): Promise<Task>;
}
