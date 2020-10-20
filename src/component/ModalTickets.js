import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getCookie} from "../factory/cookie";

function ModalTickets ({show, hide}) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    // const attachment = React.createRef()

    function send (e) {
        e.preventDefault();
        // console.log(attachment.current.files[0]);
        let cookie = getCookie();
        fetch('http://localhost:8888/klorel/wp-json/klorel/v1/new/ticket',
            {
                method: 'POST',
                body: JSON.stringify({
                    'title' : title,
                    'priority' : priority,
                    'description' : description,
                    'client': cookie['username'],
                    // 'attachment': attachment.current.files[0],
                }),
                // body : attachment.current.files[0],
            })
        .then((response) => console.log(response.status));
    }

    return (
        show ?
            ReactDOM.createPortal(
                <div className='wrap-modal'>
                    <div className='modal'>
                        <div className='Xclose' onClick={hide}>X</div>
                        <div className='modal-content'>
                            <h3>Nouveau Ticket</h3>
                            <form onSubmit={send}>
                                <div className="wrap-input">
                                    <label htmlFor="Titre">Titre</label>
                                    <input className="wrap-form-ele" type="text"
                                           onChange={(e) => setTitle(e.target.value)}
                                           value={title}/>
                                </div>
                                <div className="wrap-form-ele">
                                    <label htmlFor="Priorité">Priorité</label>
                                    <div className='align-button'>
                                        <button onClick={(e) => {e.preventDefault(); setPriority('Basse')}}>Basse</button>
                                        <button onClick ={(e) => {e.preventDefault(); setPriority('Haute')}}>Haute</button>
                                        <button onClick ={(e) => {e.preventDefault(); setPriority('Urgent')}}>Urgent</button>
                                    </div>
                                </div>
                                <div className="wrap-input">
                                    <label htmlFor="description">Description</label>
                                    <textarea  className="wrap-form-ele" cols="30" rows="10"
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

