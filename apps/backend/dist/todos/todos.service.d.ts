import { AddTodoDto } from 'src/todos/dto/add-todo.dto';
import { UpdateTodoDto } from 'src/todos/dto/update-todo.dto';
import { Todo } from 'src/todos/interfaces/todo.interface';
export declare class TodosService {
    private todos;
    currentID: number;
    add(todo: AddTodoDto): void;
    get(): Todo[];
    remove(id: number): void;
    update(id: number, todoInfo: UpdateTodoDto): void;
}
