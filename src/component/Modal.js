import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({show, hide}) =>  show ?
    ReactDOM.createPortal(
        <div className='wrap-modal'>
            <div className='modal'>
                <div className='Xclose' onClick={hide}>X</div>
                <div className='modal-content'>
                    <h3>Nouveau Ticket</h3>
                    <form>
                        <div className="wrap-input">
                            <label htmlFor="Titre">Titre</label>
                            <input className="wrap-form-ele" type="text"/>
                        </div>
                        <div className="wrap-form-ele">
                           <label htmlFor="Priorité">Priorité</label>
                           <div className='align-button'>
                               <button>Faible</button>
                               <button>Haute</button>
                               <button>Urgente</button>
                           </div>
                       </div>
                        <div className="wrap-input">
                            <label htmlFor="description">Description</label>
                            <textarea className="wrap-form-ele" cols="30" rows="10"></textarea>
                        </div>
                        <div className="wrap-form-ele">
                            <label htmlFor="Pièces jointes">Pièces jointes</label>
                            <input type="file"/>
                        </div>
                        <input className='button' type="submit" value="Ajouter"/>
                    </form>
                </div>
            </div>
        </div>, document.body) : null

export default Modal;