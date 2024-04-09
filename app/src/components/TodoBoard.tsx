import { TodoBoardProps } from "@/constants/todo.interface";
import Column from "@/components/Column";
import { FC, memo } from "react";
import { TodoStatus } from "@/constants/todo-status";

export const TodoBoard: FC<TodoBoardProps> = ({todo, doing, done, onTaskDrop}) => {
  return (
    <div style={{display: 'flex'}}>
      <Column status={TodoStatus.TODO} tasks={todo} onTaskDrop={onTaskDrop}/>
      <Column status={TodoStatus.DOING} tasks={doing} onTaskDrop={onTaskDrop}/>
      <Column status={TodoStatus.DONE} tasks={done} onTaskDrop={onTaskDrop}/>
    </div>
  );
}
