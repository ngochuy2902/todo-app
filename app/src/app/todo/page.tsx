"use client";
import React, { useEffect, useRef, useState } from "react";
import { TodoBoard } from "@/components/TodoBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { TodoStatus } from "@/constants/todo-status";
import { TodoProps } from "@/constants/todo.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app-redux/store";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "@/app-redux/slices/todoSlice";
import { Button, Input, InputRef } from "antd";

export default function Todo() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todo.todos);

  const [name, setName] = useState<string>('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    dispatch(fetchTodos());
  }, [dispatch]);

  const moveTask = (id: number, name: string, status: TodoStatus) => {
    dispatch(updateTodo({
      id,
      name,
      status,
    }));
  };

  const todo: TodoProps[] = todos.filter(task => task.status === TodoStatus.TODO);
  const doing: TodoProps[] = todos.filter(task => task.status === TodoStatus.DOING);
  const done: TodoProps[] = todos.filter(task => task.status === TodoStatus.DONE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleCreate = () => {
    if (!name.trim()) return;
    dispatch(createTodo({
      name: name.trim(),
    }));
    setName('');
    inputRef.current && inputRef.current.focus();
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1 style={{textAlign: 'center'}}>Todo App</h1>
      <div>
        <div style={{display: 'flex', justifyContent: 'end', marginBottom: '5px'}}>
          <Input type="text" ref={inputRef}
                 placeholder="Enter task name"
                 onChange={(e) => handleChange(e)}
                 onKeyDown={(e) => handleKeyPress(e)}
                 value={name}
                 style={{
                   marginRight: '10px',
                 }}
          />
          <Button type='primary'
                  onClick={handleCreate}
          >
            Create
          </Button>
        </div>
        <DndProvider backend={HTML5Backend}>
          <TodoBoard todo={todo} doing={doing} done={done} onTaskDrop={moveTask}/>
        </DndProvider>
      </div>
    </div>
  );
}
