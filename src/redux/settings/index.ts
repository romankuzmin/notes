import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';
import { SettingsState } from './types';

const initialState: SettingsState = {
    locale: config.settings.defaultLocale,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLocale: (state, action) => {
            state.locale = action.payload;
        },
    },
});

const { actions, reducer } = settingsSlice;

// Extract and export each action creator by name
export const { setLocale } = actions;

// Export the reducer, either as a default or named export
export default reducer;
