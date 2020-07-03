import { useDispatch } from 'react-redux';
import { setLocale } from './index';
import { AppDispatch, useTypedSelector } from '../typed-hooks';
import { SettingsState } from './types';

type SettingsHook = {
    settings: SettingsState;
    setLocale: (locale: string) => void;
};

export const useSettings = () => {
    const dispatch = useDispatch<AppDispatch>();
    const settings = useTypedSelector((state) => state.settings);

    return {
        settings,
        setLocale: (locale: string) => dispatch(setLocale(locale)),
    } as SettingsHook;
};
