import { delay, put, takeEvery } from 'redux-saga/effects';
import { addTodo, todoAdded } from './todosSlice';
import Todo from '../../model/Todo';

function* addTodoAsync(todo: Todo) {
    yield delay(2000);
    yield put(todoAdded({
        todo: todo,
    }));
}

function* addTodoSaga() {
    yield takeEvery(addTodo, (action) => addTodoAsync(action.payload.todo));
}

export default addTodoSaga;
