import { ActionCreatorWithPayload, AnyAction, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import config from '../../config';
import { fetchApi } from '../../utils/fetch-api';
import { NoteState } from './types';

// First approach: define the initial state using that type
const initialState: NoteState = {
    state: 'none',
    list: [],
};

// @reduxjs/toolkit use Immer for immutability under the hood, so this code is immutable
const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: (state) => {
            state.state = 'none';
        },
        fetchNotes: (state) => {
            state.state = 'fetching';
        },
        fetchNotesFulfilled: (state, action) => {
            state.state = 'fulfilled';
            state.list = action.payload;
        },
        fetchNote: (state, action) => {
            state.state = 'fetching';
        },
        fetchNoteFulfilled: (state, action) => {
            state.state = 'fulfilled';
            state.detail = action.payload;
        },
        createNote: (state: Draft<NoteState>, action) => {
            state.state = 'creating';
        },
        createNoteFulFilled: (state, action) => {
            state.state = 'fulfilled';
            state.list.push(action.payload);
        },
        updateNote: (state, action) => {
            state.state = 'updating';
            state.notify = 'notes.detail.updating';
        },
        updateNoteFulfilled: (state, action) => {
            const { id, ...rest } = action.payload;

            state.state = 'fulfilled';
            if (state.detail) {
                state.detail.title = rest.title;
            }
        },
        deleteNote: (state: Draft<NoteState>, action: PayloadAction<unknown>) => {
            state.state = 'deleting';
            state.notify = 'notes.detail.deleting';
        },
        deleteNoteFulfilled: (state, action) => {
            const { id } = action.payload;
            const index = state.list.findIndex((item) => item.id === id);

            state.state = 'fulfilled';
            state.list.splice(index, 1);
        },
        error: (state, action) => {
            const error = action.payload;

            state.state = 'rejected';
            state.notify = error;
        },
        notify: (state, action) => {
            state.notify = action.payload;
            state.state = 'none';
        },
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = notesSlice;

const sagaActions = {
    FETCH_NOTES: 'notes/fetchNotes',
    FETCH_NOTE: 'notes/fetchNote',
    CREATE_NOTE: 'notes/createNote',
    UPDATE_NOTE: 'notes/updateNote',
    DELETE_NOTE: 'notes/deleteNote',
    NOTIFY_MESSAGE: 'notes/notifyMessage',
};

function* fetchNotesSaga() {
    yield processCall(fetchNotesFulfilled);
}

function* fetchNoteSaga(action: AnyAction) {
    const id = action.payload;

    yield processCall(fetchNoteFulfilled, id);
}

function* createNoteSaga(action: AnyAction) {
    yield processCall(createNoteFulFilled, undefined, 'POST', action.payload);
}

function* updateNoteSaga(action: AnyAction) {
    const { id, ...rest } = action.payload;
    yield processCall(updateNoteFulfilled, id, 'PUT', rest);
}

function* deleteNoteSaga(action: AnyAction) {
    const { id } = action.payload;
    yield processCall(deleteNoteFulfilled, id, 'DELETE');
}

function* processCall<T>(actionFulfilled: ActionCreatorWithPayload<T>, id?: string, method = 'GET', data?: T) {
    try {
        const apiUrl = `${config.apiUrl}${config.resource.notes}`;
        const url = id ? `${apiUrl}/${id}` : apiUrl;
        const result = yield call(() => fetchApi(url, method, data));
        yield put(actionFulfilled(result));
        yield put(reset());
    } catch (e) {
        console.error(e.message);
        let errorMessage =
            method === 'PUT' || method === 'POST' ? 'notes.detail.errors.updating' : 'notes.detail.errors.fetching';
        errorMessage = method === 'DELETE' ? 'notes.detail.errors.deleting' : errorMessage;

        yield put(error(errorMessage));
    }
}

export function* noteSaga() {
    yield takeEvery(sagaActions.FETCH_NOTES, fetchNotesSaga);
    yield takeEvery(sagaActions.FETCH_NOTE, fetchNoteSaga);
    yield takeEvery(sagaActions.CREATE_NOTE, createNoteSaga);
    yield takeEvery(sagaActions.UPDATE_NOTE, updateNoteSaga);
    yield takeEvery(sagaActions.DELETE_NOTE, deleteNoteSaga);
}

// Extract and export each action creator by name
export const {
    notify,
    error,
    reset,
    fetchNote,
    fetchNoteFulfilled,
    fetchNotes,
    fetchNotesFulfilled,
    createNote,
    createNoteFulFilled,
    updateNote,
    updateNoteFulfilled,
    deleteNote,
    deleteNoteFulfilled,
} = actions;

// Export the reducer, either as a default or named export
export default reducer;
