import React, {useState} from "react";
import {auth} from "../factory/jwt-auth";
import {setCookie} from "../factory/cookie";

function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function redirect (e) {
        e.preventDefault();
        auth(username, password, setCookie);
    }

    return (
        <div>
            <h1 className='title-login'>Lenkos Ticket</h1>
            <form className='login-form' onSubmit={redirect}>
                <div className='login-content'>
                    <label for='email' className='text-label'>E-mail</label>
                        <div className='in-log-wrap'>
                            <input className={'in-log-wrap'} type='text' id='username' value={username} onChange={e => setUsername(e.target.value)}/>
                        </div>
                    <label for='mot de passe' className='text-label'>Mot de passe</label>
                        <div className='in-log-wrap'>
                            <input className={'in-log-wrap'} type='password' id='password' value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                    <input className='button' type='submit' value='Connexion'/>
                </div>
            </form>
        </div>
    )
}

export default Login;