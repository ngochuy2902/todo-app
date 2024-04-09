import { TodoStatus } from "@/constants/todo-status";

export interface TodoProps {
    id: number;
    name: string;
    status: TodoStatus;
}

export interface ColumnProps {
    status: TodoStatus;
    tasks: TodoProps[];
    onTaskDrop: (taskId: number, name: string, status: TodoStatus) => void;
}

export interface TodoBoardProps {
    todo: TodoProps[];
    doing: TodoProps[];
    done: TodoProps[];
    onTaskDrop: (taskId: number, name: string, status: TodoStatus) => void;
}