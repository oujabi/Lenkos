import React from 'react';
import {Link} from "react-router-dom";
import {destroyCookie} from "../factory/cookie";

function Menu ({bool}) {
    function handleSubmit () {
        destroyCookie()
    }

    return (
        <nav className='menu-nav'>
            <ul>
                <li><Link to="/">Tickets</Link></li>
                <li><Link to="/credits">Credits</Link></li>
                <li><Link to="/account">Account</Link></li>
                {
                    (bool) ? <li><Link onClick={handleSubmit} to="/login">Log out</Link></li> : null
                }
            </ul>
        </nav>
    )
}

export default Menu;