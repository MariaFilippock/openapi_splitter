import { configureStore } from '@reduxjs/toolkit';
import openApiReducer from './AppSlice';

export const store = configureStore({
    reducer: {
        openApi: openApiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
