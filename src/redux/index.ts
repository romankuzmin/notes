import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import notesReducer from './notes';
import settingsReducer from './settings';
import rootSaga from './rootSaga';

export const browserHistory = createBrowserHistory();

const rootReducer = combineReducers({
    notes: notesReducer,
    settings: settingsReducer,
    router: connectRouter(browserHistory),
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), routerMiddleware(browserHistory), sagaMiddleware];

const preloadedState = {};

export const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
