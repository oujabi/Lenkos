import React, {useState} from "react";
import {setCookie} from "../factory/cookie";
import {auth} from "../API/jwt-auth";

const Login = () => {
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
                    <label>
                        <div className='text-label'>E-mail</div>
                        <div className='in-log-wrap'>
                            <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)}/>
                        </div>
                    </label>
                    <label>
                        <div className='text-label'>Mot de passe</div>
                        <div className='in-log-wrap'>
                            <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </label>
                    <input className='button' type='submit' value='Connexion'/>
                </div>
            </form>
        </div>
    )
}

export default Login;