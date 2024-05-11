import React from 'react';
import {Link} from "react-router-dom";
import './MainMenu.scss';

const MainMenu = () => {
    return (
        <nav className={'mainMenu-nav'}>
            <Link to="/" className={'mainMenu-item'}>Tasks</Link>
            <Link to="/add" className={'mainMenu-item'}>Add</Link>
            <Link to="/help" className={'mainMenu-item'}>Help</Link>
        </nav>
    );
};

export default MainMenu;