import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import osReducer from './slices/osSlice';

const savedState = localStorage.getItem('edu-os-state');
const preloadedState = savedState ? { os: JSON.parse(savedState) } : undefined;

export const store = configureStore({
  reducer: {
    os: osReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('edu-os-state', JSON.stringify(store.getState().os));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './slices/osSlice';
