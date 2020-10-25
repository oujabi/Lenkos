import React from 'react';
import ReactDOM from 'react-dom';
import {allowOverflow} from '../utils/overflow';

const ModalShowCredits = ({date, operation, temps, title, type, show, hide}) => {

/****************** Affichage des données du composant ******************/
    return show ?
            ReactDOM.createPortal(
                <div className='wrap-modal'>
                    <div className='modal'>
                        <div className='Xclose' onClick={() => {allowOverflow(); hide()}}>X</div>
                        <div className='modal-content'>
                            <h3>{date}</h3>
                            <em className={operation}>{temps}</em>
                            <p>{title}</p>
                            <p>{type}</p>
                        </div>
                    </div>
                </div>
            ,document.body) : null
}

export default ModalShowCredits;