import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Todo from '../../model/Todo';

// Define action payload types
type ADD_TODO = {
  todo: Todo;
};

type TODO_ADDED = {
  todo: Todo;
};

type TODO_UPDATED = {
  todo: Todo;
};

type TODO_REMOVED = {
  todo: Todo;
};

type TODO_COMPLETED = {
  todo: Todo;
};

type TODO_INCOMPLETED = {
  todo: Todo;
};

// Initial state
const initialState: Todo[] = [];

// Slice
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (_state, _action: PayloadAction<ADD_TODO>) => {
      // Handled by saga — no state mutation
    },

    todoAdded: (state, action: PayloadAction<TODO_ADDED>) => {
      state.push(action.payload.todo);
    },

    todoUpdated: (state, action: PayloadAction<TODO_UPDATED>) => {
      const index = state.findIndex(item => item.id === action.payload.todo.id);
      if (index !== -1) {
        state[index] = action.payload.todo;
      }
    },

    todoRemoved: (state, action: PayloadAction<TODO_REMOVED>) => {
      return state.filter(item => item.id !== action.payload.todo.id);
    },

    todoCompleted: (state, action: PayloadAction<TODO_COMPLETED>) => {
      return state.map(item =>
        item.id === action.payload.todo.id
          ? { ...item, isCompleted: true }
          : item
      );
    },

    todoInCompleted: (state, action: PayloadAction<TODO_INCOMPLETED>) => {
      return state.map(item =>
        item.id === action.payload.todo.id
          ? { ...item, isCompleted: false }
          : item
      );
    },
  },
});

export const {
  addTodo,
  todoAdded,
  todoUpdated,
  todoRemoved,
  todoCompleted,
  todoInCompleted,
} = todosSlice.actions;

export default todosSlice.reducer;
