import React, {useState} from 'react';
import {auth} from '../factory/jwt-auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const redirect = (ev) => {
        ev.preventDefault();
        auth(username, password);
    }

    return (
        <div>
            <h1 className={'title-login'}>Lenkos Ticket</h1>
            <form className={'login-form'} onSubmit={redirect}>
                <div className={'login-content'}>
                    <label htmlFor={'email'} className={'text-label'}>E-mail</label>
                        <div className={'in-log-wrap'}>
                            <input className={'in-log-wrap'} type={'text'} id={'username'} value={username} onChange={ev => setUsername(ev.target.value)}/>
                        </div>
                    <label htmlFor={'mot de passe'} className={'text-label'}>Mot de passe</label>
                        <div className={'in-log-wrap'}>
                            <input className={'in-log-wrap'} type='password' id='password' value={password} onChange={ev => setPassword(ev.target.value)}/>
                        </div>
                    <input className='button' type='submit' value='Connexion'/>
                </div>
            </form>
        </div>
    )
}

export default Login;