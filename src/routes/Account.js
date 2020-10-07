import React, {useEffect, useState} from 'react';
import Menu from "../component/Menu";
import {validate} from "../factory/jwt-auth";
import {getCookie} from "../factory/cookie";

function Account () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerif, setPasswordVerif] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const cookie = getCookie();
        if (cookie['token'] !== '') {
            validate(cookie['token']);
            setUsername(cookie['username']);
            fetch('http://localhost:8888/klorel/wp-json/klorel/v1/user/'+cookie['username']+'', {method: 'GET'})
                .then((response) => {
                    if (response.status !== 200) throw new Error('HTTP Status :'+response.status);
                    return response.json()})
                .then((json) => {
                    setFirstName(json['first_name']);
                    setLastName(json['last_name']);
                    setEmail(json['email']);
                    setUsername(json['login']);
                    })
                .catch((err) => (console.log(err)))
            } else {window.location.pathname = '/login'}},[])

    function send () {
        fetch('http://localhost:8888/klorel/wp-json/klorel/v1/update/user/'+{username},
            {
                method: 'POST',
                body: JSON.stringify({
                    'email' : email,
                    'password' : password,
                    'username': username,
                    }
                ),
            })
            .then((response) => console.log(response.status))
    }
    return(
        <div className='wrap-account'>
            <Menu bool={true}/>
            <h1>Mon compte</h1>
            <form className='form-account' onSubmit={send}>
                <div className='wrap-form'>
                    <div className='wrap-input'>
                        <label htmlFor="Prénom">Prénom</label>
                        <input className='wrap-form-ele' type='text' readOnly value={firstName}/>
                    </div>
                    <div className='wrap-input'>
                        <label htmlFor="Nom">Nom</label>
                        <input className='wrap-form-ele' type='text' readOnly value={lastName}/>
                    </div>
                    <div className='wrap-input'>
                        <label htmlFor="email">Email</label>
                        <input className='wrap-form-ele' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='wrap-input'>
                        <label htmlFor="Nouveau mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}>Nouveau mot de passe</label>
                        <input className='wrap-form-ele' type='password'/>
                    </div>
                    <div className='wrap-input'>
                        <label htmlFor="Répétez le mot de passe" value={passwordVerif} onChange={(e) => setPasswordVerif(e.target.value)}>Répéter le mot de passe</label>
                        <input className='wrap-form-ele' type='password'/>
                    </div>
                    <div className="wrap-input">
                        <input className="button" type="submit" value='je valide !'/>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Account;