import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useTypedSelector } from '../typed-hooks';
import { createNote, deleteNote, fetchNote, fetchNotes, notify, updateNote } from './index';
import { Note, ProcessState } from './types';

type NotesHook = {
    notes: Note[];
    refresh: () => void;
};

type NoteHook = {
    note: Note | undefined;
    createNote: (note: Note) => void;
    updateNote: (note: Note) => void;
    deleteNote: (note: Note) => void;
};

type WithProcessStateAndNotify<T> = T & {
    state: ProcessState;
    message: string | undefined;
    notifyMessage: (message: string) => void;
};

const dispatchAction = (dispatch: AppDispatch, action: (state: Draft<Note>) => PayloadAction<Note>) => (note: Note) => {
    dispatch(
        action({
            id: note.id,
            title: note.title,
        }),
    );
};

const notifyMessage = (dispatch: AppDispatch) => (message: string) => {
    dispatch(notify(message));
};

export const useNotes = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { state, list, notify } = useTypedSelector((state) => state.notes);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    return {
        notes: list,
        state: state,
        message: notify,
        refresh: () => dispatch(fetchNotes()),
        notifyMessage: notifyMessage(dispatch),
    } as WithProcessStateAndNotify<NotesHook>;
};

export const useNote = (id?: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const { state, detail, notify } = useTypedSelector((state) => state.notes);

    useEffect(() => {
        if (id) {
            dispatch(fetchNote(id));
        }
    }, [dispatch, id]);

    return {
        note: id ? detail : undefined,
        state: state,
        message: notify,
        createNote: dispatchAction(dispatch, createNote),
        updateNote: dispatchAction(dispatch, updateNote),
        deleteNote: dispatchAction(dispatch, deleteNote),
        notifyMessage: notifyMessage(dispatch),
    } as WithProcessStateAndNotify<NoteHook>;
};
