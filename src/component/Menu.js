import React from 'react';
import {Link} from "react-router-dom";
import {destroyCookie} from "../factory/cookie";

function Menu ({current}) {
    function handleSubmit () {
        destroyCookie()
    }

    return (
        <nav className='menu-nav'>
            <ul>
                {
                    (current !== 'Tickets' ? <li><Link to="/">Tickets</Link></li> : null)
                }
                {
                    (current !== 'Credits' ? <li><Link to="/credits">Credits</Link></li> : null)
                }
                {
                    (current !== 'Account' ? <li><Link to="/account">Account</Link></li> : null)
                }
                <li><Link onClick={handleSubmit} to="/login">Log out</Link></li>
            </ul>
        </nav>
    )
}

export default Menu;