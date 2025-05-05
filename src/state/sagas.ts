import { all } from 'redux-saga/effects';
import addTodoSaga from './todo/todosSagas';

export default function* rootSaga() {
    yield all([
        addTodoSaga(),
    ]);
}
