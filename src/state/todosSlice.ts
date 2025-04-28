import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../model/todo";

type ADD_TODO = {
    todo: Todo
}

type UPDATE_TODO = {
    todo: Todo
}

type REMOVE_TODO = {
    todo: Todo
}

const initialState: Todo[] = []

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      todoAdded: (state, action: PayloadAction<ADD_TODO>) => {
        state.push(action.payload.todo);
      },
      todoUpdated: (state, action: PayloadAction<UPDATE_TODO>) => {
        const index = state.findIndex(item => item.id === action.payload.todo.id);
        if (index !== -1) {
          state[index] = action.payload.todo;
        }
      },
      todoRemoved: (state, action: PayloadAction<REMOVE_TODO>) => {
        return state.filter(item => item.id !== action.payload.todo.id);
      }
    }
  });
  
  export const { todoAdded, todoUpdated, todoRemoved } = todosSlice.actions;
  export default todosSlice.reducer;