import React from 'react';
import {Link} from "react-router-dom";

function Menu () {
    return (
        <nav>
            <ul>
                <li><Link to="/">Tickets</Link></li>
                <li><Link to="/credits">Credits</Link></li>
            </ul>
        </nav>
    )
}

export {Menu}