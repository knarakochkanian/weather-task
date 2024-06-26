import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IInitialState {
    isCelsius: boolean;
    city: string
}

const initialState: IInitialState = {
    isCelsius: true,
    city: 'Yerevan'
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setIsCelsius(state, { payload }) {
            state.isCelsius = payload;
        },
        setCity(state, { payload }) {
            state.city = payload;
        },
    },
});

export const { setIsCelsius , setCity} = generalSlice.actions;
export const selectIsCelsius = (state: RootState) => state.general.isCelsius;
export const selectCityIsCelsius = (state: RootState) => state.general.city;

export default generalSlice.reducer;
