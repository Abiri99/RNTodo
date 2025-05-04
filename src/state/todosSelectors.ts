import { RootState } from './store';

export const todosSelector = (state: RootState) => state.todos;
export const todosCompletedSelector = (state: RootState) => state.todos.filter((todo) => todo.isCompleted);
export const todosIncompletedSelector = (state: RootState) => state.todos.filter((todo) => !todo.isCompleted);
