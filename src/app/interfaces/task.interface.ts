export interface ITask {
    id: number;
    text: string;
    date: string;
    isCompleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    completedAt?: Date | null;
}