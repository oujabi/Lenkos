import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {allowOverflow} from '../utils/overflow';
import {postTicket} from '../factory/API';

const ModalTickets = ({show, hide}) => {
/****************** Initialisation des différents "State" avec l'utilisation du "hooks" useState (hook natif) ******************/
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    // const attachment = React.createRef()

/****************** Gestion du formulaire et envoie des données ******************/
    const handleClick = (ev) => {
        ev.preventDefault();
        setPriority(ev.target.textContent)
    }

    const send = (ev) => {
        ev.preventDefault();
        // console.log(attachment.current.files[0]);
        if (title !== '') {
            postTicket(title, priority, description)
        }else {setError(true)}
    }

/****************** Affichage du formulaire ******************/
    return (
        show ?
            ReactDOM.createPortal(
                <div className={'wrap-modal'}>
                    <div className={'modal'}>
                        <div className={'Xclose'} onClick={ () => {allowOverflow(); hide()} }>X</div>
                        <div className={'modal-content'}>
                            <h3>Nouveau Ticket</h3>
                            <form onSubmit={send}>
                                <div>
                                    {
                                        error ? <p style={{color : 'red'}}>Veuillez entrez un titre</p>: null
                                    }
                                </div>
                                <div className={'wrap-input'}>
                                    <label htmlFor={'Titre'}>Titre</label>
                                    <input className={'input-ticket-titre wrap-form-ele'} type={'text'}
                                           onChange={(ev) => setTitle(ev.target.value)}
                                           value={title}/>
                                </div>
                                <div className={'wrap-form-ele priority-ticket'}>
                                    <label htmlFor={'Priorité'}>Priorité</label>
                                    <div className={'align-button'}>
                                        <button style={ priority === 'Basse' ? {backgroundColor : 'green'} : null} onClick={handleClick}>Basse</button>
                                        <button style={ priority === 'Haute' ? {backgroundColor : 'orange'} : null} onClick ={handleClick}>Haute</button>
                                        <button style={ priority === 'Urgent' ? {backgroundColor : 'red'} : null} onClick ={handleClick}>Urgent</button>
                                    </div>
                                </div>
                                <div className={'wrap-input'}>
                                    <label htmlFor={'description'}>Description</label>
                                    <textarea  className={'wrap-form-ele text-area-ticket'} cols={'30'} rows={'10'}
                                               onChange={(ev) => {setDescription(ev.target.value)}}
                                               value={description}></textarea>
                                </div>
                                {/*<div className='wrap-form-ele'>*/}
                                {/*    <label htmlFor='Pièces jointes'>Pièces jointes</label>*/}
                                {/*    <input type='file' ref={attachment}/>*/}
                                {/*</div>*/}
                                <input className={'button'} type={'submit'} value={'Ajouter'}/>
                            </form>
                        </div>
                    </div>
                </div>, document.body) : null
            )
        }

export default ModalTickets;

