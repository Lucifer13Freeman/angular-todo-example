export class TodoDto {
    readonly id!: number;
    readonly text!: string;
    readonly isCompleted?: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly completedAt?: Date | null;
}