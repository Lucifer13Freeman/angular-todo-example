import { ITodo } from "../interfaces/todo.interface";

export class TodoEntity implements ITodo {
    public id!: number;
    public text!: string;
    public isCompleted!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
    public completedAt!: Date | null;
}