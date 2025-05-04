import Todo from '../model/Todo';
import { todosCompletedSelector, todosIncompletedSelector, todosSelector } from './todosSelectors';

const emptyTodos: Todo[] = [];
const dummyTodos: Todo[] = [
    {
        id: 1,
        title: 'Hello World',
        isCompleted: false,
    },
    {
        id: 2,
        title: 'Hello Alireza',
        isCompleted: true,
    },
    {
        id: 2,
        title: 'Hello Sam',
        isCompleted: false,
    },
];

describe('default todoSelector', () => {
    it('should return an empty list when no todos', () => {
        expect(todosSelector({ todos: emptyTodos })).toEqual([]);
    });

    it('should return all the todos when there is any', () => {
        expect(todosSelector({ todos: dummyTodos })).toEqual(dummyTodos);
    });
});

describe('completed todoSelector', () => {
    it('should only return completed todos', () => {
        expect(todosCompletedSelector({ todos: dummyTodos })).toEqual(dummyTodos.filter((todo) => todo.isCompleted));
    });
});

describe('incompleted todoSelector', () => {
    it('should only return completed todos', () => {
        expect(todosIncompletedSelector({ todos: dummyTodos })).toEqual(dummyTodos.filter((todo) => !todo.isCompleted));
    });
});


