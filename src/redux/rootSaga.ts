import { fork } from 'redux-saga/effects';
import { noteSaga } from './notes';

export default function* rootSaga() {
    yield fork(noteSaga);
    // code after fork-effect
}
