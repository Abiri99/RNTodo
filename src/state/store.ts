import createSagaMiddleware from 'redux-saga';
import todosReducer from './todo/todosSlice';
import rootSaga from './sagas';
import { applyMiddleware, createStore } from 'redux';
import Todo from '../model/Todo';

const initialState = {
    todos: []
}

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    return {
    ...createStore(todosReducer, initialState, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run
    }
}

// export type RootState = ReturnType<typeof store.getState>;