import React from "react";
import styles from "./Header.module.scss";
import Input from "../Input/input";
import Toggle from "../Toggle/Toggle";

const Header: React.FC = () => {
    return (
        <header className={styles.HeaderWrapper}>
            <div>
                <Input/>
                <Toggle/>
            </div>
        </header>
    )
}

export default Header;