export interface ITodo {
    id: number;
    text: string;
    isCompleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    completedAt?: Date | null;
}