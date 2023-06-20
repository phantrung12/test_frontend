import { createReducer } from './reducer';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import errorMiddleware from '../config/error-middleware';

const store = configureStore({
  reducer: createReducer(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.config',
          'payload.request',
          'error',
          'meta.arg',
        ],
      },
    }).concat(errorMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

const getStore = () => store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  AnyAction
>;

export default getStore;
