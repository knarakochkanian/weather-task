import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './features/generalSlice';
import logger from 'redux-logger';

export const makeStore = () => {
    return configureStore({
        reducer: {
            general: generalReducer,
        },
        middleware: (getDefaultMiddleware) =>
            process.env.NODE_ENV === 'development'
                ? getDefaultMiddleware().concat(logger)
                : getDefaultMiddleware(),
    });
};

const store = makeStore();

export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
