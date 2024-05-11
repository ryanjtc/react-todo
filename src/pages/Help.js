import React from 'react';
import {NavLink, Outlet} from "react-router-dom";


const Help = () => {
    return (
        <div className={'tasks-container'}>
          <h1>Help</h1>
            <ul>
                <li>
                    <NavLink to={''}>Introduction</NavLink>
                </li>
                <li>
                    <NavLink to={'add'}>Adding Tasks</NavLink>
                </li>
                <li>
                    <NavLink to={'remove'}>Removing Tasks</NavLink>
                </li>
                <li>
                    <NavLink to={'change'}>Change Status</NavLink>
                </li>
            </ul>
            <Outlet />
        </div>
    );
};

export default Help;