import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, store } from './index';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
