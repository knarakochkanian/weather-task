import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setIsCelsius } from '../../store/features/generalSlice';
import styles from "./Toggle.module.scss"
const Toggle: React.FC = () => {
    const dispatch = useDispatch();
    const isCelsius = useSelector((state: RootState) => state.general.isCelsius);

    const handleToggle = () => {
        dispatch(setIsCelsius(!isCelsius));
        console.log(dispatch(setIsCelsius(!isCelsius)), "$$$$")
    };

    return (
        <button onClick={handleToggle} className={styles.Toggle}>
            {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
        </button>
    );
};

export default Toggle;
