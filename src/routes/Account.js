import React, {useEffect, useState} from 'react';
import Menu from '../components/Menu';
import {getUser, updateUser} from '../factory/API';

const Account = () => {
/****************** Initialisation des différentes "State" avec l'utilisation des "hooks" useState******************/
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerif, setPasswordVerif] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);

/****************** Gestion du cycle de vie du composant et envoie des données à l'API ******************/
    useEffect(() => { getUser(setFirstName, setLastName, setEmail,setUsername) }, [])

    const send = (ev) => {
        ev.preventDefault();
        if (password === passwordVerif) {
            updateUser(email, password, username);
            setError(false);
        } else {
            setError(true);
        }
    }

/****************** Affichage des données du composant ******************/
    return(
        <div className={'wrap-account'}>
            <Menu current={'Account'}/>
            <h1>Mon compte</h1>
            <form className={'form-account'} onSubmit={send}>
                <div className={'wrap-form'}>
                    <div className={'wrap-input'}>
                        <label htmlFor={'Prénom'}>Prénom</label>
                        <input className={'wrap-form-ele'} type={'text'} value={firstName} readOnly />
                    </div>
                    <div className={'wrap-input'}>
                        <label htmlFor={'Nom'}>Nom</label>
                        <input className={'wrap-form-ele'} type={'text'} readOnly value={lastName}/>
                    </div>
                    <div className={'wrap-input'}>
                        <label htmlFor={'email'}>Email</label>
                        <input className={'wrap-form-ele'} type={'email'} value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                    </div>
                    <div>
                        {
                            error ? <p style={{color : 'red'}}>Les mots de passe ne sont pas identique</p> : null
                        }
                    </div>
                    <div className={'wrap-input'}>
                        <label htmlFor={'Nouveau mot de passe'}>Nouveau mot de passe</label>
                        <input className={'wrap-form-ele'} type={'password'} value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                    </div>
                    <div className={'wrap-input'}>
                        <label htmlFor={'Répétez le mot de passe'} >Répéter le mot de passe</label>
                        <input className={'wrap-form-ele'} type={'password'} value={passwordVerif} onChange={(ev) => setPasswordVerif(ev.target.value)}/>
                    </div>
                    <div className={'wrap-input'}>
                        <input className={'button'} type={'submit'} value={'je valide !'}/>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Account;