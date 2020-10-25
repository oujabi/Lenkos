import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {getCookie} from "../factory/cookie";

function ModalTickets ({show, hide, allowOverflow }) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const [select, setSelect] = useState('');
    // const attachment = React.createRef()

    function send (e) {
        e.preventDefault();
        // console.log(attachment.current.files[0]);
        if (title !== '') {
            let cookie = getCookie();
            fetch('http://localhost:8888/klorel/wp-json/klorel/v1/new/ticket',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        'title': title,
                        'priority': priority,
                        'description': description,
                        'client': cookie['username'],
                        // 'attachment': attachment.current.files[0],
                    }),
                    // body : attachment.current.files[0],
                })
                .then(response => {
                    if (response.status === 200) {
                        window.location.pathname = 'Tickets'
                    } else {
                        console.log(response.status)
                    }
                })
        }else {setError(true)}
    }

    return (
        show ?
            ReactDOM.createPortal(
                <div className='wrap-modal'>
                    <div className='modal'>
                        <div className='Xclose' onClick={() => {allowOverflow(); hide(); }}>X</div>
                        <div className='modal-content'>
                            <h3>Nouveau Ticket</h3>
                            <form onSubmit={send}>
                                <div>
                                    {
                                        error ? <p style={{color : 'red'}}>Veuillez entrez un titre</p>: null
                                    }
                                </div>
                                <div className="wrap-input">
                                    <label htmlFor="Titre">Titre</label>
                                    <input className="input-ticket-titre wrap-form-ele" type="text"
                                           onChange={(e) => setTitle(e.target.value)}
                                           value={title}/>
                                </div>
                                <div className="wrap-form-ele priority-ticket">
                                    <label htmlFor="Priorité">Priorité</label>
                                    <div className='align-button'>
                                        <button style={ select === 'Basse' ? {backgroundColor : 'green'} : null} onClick={(e) => {e.preventDefault(); setSelect('Basse'); setPriority('Basse')}}>Basse</button>
                                        <button style={ select === 'Haute' ? {backgroundColor : 'orange'} : null} onClick ={(e) => {e.preventDefault(); setSelect('Haute'); setPriority('Haute')}}>Haute</button>
                                        <button style={ select === 'Urgent' ? {backgroundColor : 'red'} : null} onClick ={(e) => {e.preventDefault(); setSelect('Urgent'); setPriority('Urgent')}}>Urgent</button>
                                    </div>
                                </div>
                                <div className="wrap-input">
                                    <label htmlFor="description">Description</label>
                                    <textarea  className="wrap-form-ele text-area-ticket" cols="30" rows="10"
                                               onChange={(e) => {setDescription(e.target.value)}} value={description}></textarea>
                                </div>
                                {/*<div className="wrap-form-ele">*/}
                                {/*    <label htmlFor="Pièces jointes">Pièces jointes</label>*/}
                                {/*    <input type="file" ref={attachment}/>*/}
                                {/*</div>*/}
                                <input className='button' type="submit" value="Ajouter"/>
                            </form>
                        </div>
                    </div>
                </div>, document.body) : null
            )
        }

export default ModalTickets;

