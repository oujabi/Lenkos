import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function ModalTickets ({show, hide}) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    // const [attachment, setAttachment] = useState('');

    function send (e) {
        e.preventDefault();
        fetch('http://localhost:8888/klorel/wp-json/klorel/v1/new/ticket',
            {
                method: 'POST',
                body: JSON.stringify({
                    'title' : title,
                    'priority' : priority,
                    'description' : description,
                }),
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
                                        <button onClick={() => {setPriority('faible')}}>Faible</button>
                                        <button onClick ={() => {setPriority('haute')}}>Haute</button>
                                        <button onClick ={() => {setPriority('urgent')}}>Urgente</button>
                                    </div>
                                </div>
                                <div className="wrap-input">
                                    <label htmlFor="description">Description</label>
                                    <textarea  className="wrap-form-ele" cols="30" rows="10"
                                               onChange={(e) => {setDescription(e.target.value)}} value={description}></textarea>
                                </div>
                                {/*<div className="wrap-form-ele">*/}
                                {/*    <label htmlFor="Pièces jointes">Pièces jointes</label>*/}
                                {/*    <input type="file"/>*/}
                                {/*</div>*/}
                                <input className='button' type="submit" value="Ajouter"/>
                            </form>
                        </div>
                    </div>
                </div>, document.body) : null
            )
        }

export default ModalTickets;

