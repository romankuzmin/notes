export type ProcessState = 'none' | 'fetching' | 'creating' | 'updating' | 'deleting' | 'rejected' | 'fulfilled';

export type Note = {
    id: string;
    title: string;
};

export type NoteState = {
    state: ProcessState;
    notify?: string;
    detail?: Note;
    list: Note[];
};
