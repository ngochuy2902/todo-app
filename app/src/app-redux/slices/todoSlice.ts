'use client';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoProps } from "@/constants/todo.interface";
import { TodoStatus } from "@/constants/todo-status";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('http://localhost:8080/todo');
  return await response.json();
});

export const createTodo = createAsyncThunk('todos/createTodo', async (todo: { name: string }) => {
  const response = await fetch('http://localhost:8080/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return await response.json();
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo: {
  id: number,
  name: string,
  status: TodoStatus
}) => {
  const { id, name, status } = todo;
  const payload = { name, status };
  const response = await fetch(`http://localhost:8080/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id:number) => {
  await fetch(`http://localhost:8080/todo/${id}`, {
    method: 'DELETE',
  });

  return { id };
});

interface TodoState {
  todos: TodoProps[];
  status: string;
  error: string | null | undefined;
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      });
  }
});

export default todoSlice.reducer;
