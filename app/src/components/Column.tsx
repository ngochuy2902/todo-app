import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ColumnProps, TodoProps } from "@/constants/todo.interface";
import { ItemTypes } from "@/constants/itemTypes";
import Todo from "@/components/Todo";

const Column: React.FC<ColumnProps> = ({status, tasks, onTaskDrop}) => {
  const [{isOver}, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: TodoProps, monitor) => {
      item.status !== status && onTaskDrop(item.id, item.name, status);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = useRef(null);
  drop(ref);

  return (
    <div style={{
      display: 'block',
      borderStyle: 'solid',
      borderWidth: '1px',
      margin: '2px',
    }}>
      <h3 style={{textAlign: 'center'}}>{status}</h3>
      <div ref={ref}
           style={{
             width: '350px',
             minHeight: '60%'
           }}>
        {tasks.map((task) => (
          <Todo key={task.id} id={task.id} name={task.name} status={task.status}/>
        ))}
      </div>
    </div>
  );
};

export default Column;
