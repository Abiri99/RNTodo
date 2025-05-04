import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Todo from '../model/Todo';

type ADD_TODO = {
    todo: Todo
}

type UPDATE_TODO = {
    todo: Todo
}

type REMOVE_TODO = {
    todo: Todo
}

type COMPLETE_TODO = {
  todo: Todo
}

type INCOMPLETE_TODO = {
  todo: Todo
}

const initialState: Todo[] = [];

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
      },
      todoCompleted: (state, action: PayloadAction<COMPLETE_TODO>) => {
        return state.map((item) => {
          if (item.id === action.payload.todo.id) {
            return {
              ...item,
              isCompleted: true,
            };
          } else {
            return item;
          }
        });
      },
      todoInCompleted: (state, action: PayloadAction<INCOMPLETE_TODO>) => {
        return state.map((item) => {
          if (item.id === action.payload.todo.id) {
            return {
              ...item,
              isCompleted: false,
            };
          } else {
            return item;
          }
        });
      },
    },
  });

  export const { todoAdded, todoUpdated, todoRemoved, todoCompleted, todoInCompleted } = todosSlice.actions;
  export default todosSlice.reducer;
