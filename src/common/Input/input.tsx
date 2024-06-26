import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setCity } from '../../store/features/generalSlice';
import styles from "./Input.module.scss";

const Input: React.FC = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (input.trim() !== '') {
            dispatch(setCity(input.trim()));
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.Input}>
            <input
                type="text"
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch} className={styles.InputButton}>
                Search City
            </button>
        </div>
    );
}

export default Input;
