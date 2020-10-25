import React from 'react';
import ReactDOM from 'react-dom';
import {allowOverflow} from '../utils/overflow';

const ModalShowTickets = ({show, hide, index, status, title, content, priority}) => {

/****************** Affichage des Données du composant ******************/
    return show ?
            ReactDOM.createPortal(
                <div className={'wrap-modal'}>
                    <div className={'modal'}>
                        <div className={'Xclose'} onClick={ () => {allowOverflow(); hide() } }>X</div>
                        <div className={'modal-content'}>
                            <div className={'card-header'}>
                                <em>Index : {index}</em>
                                <em>Status: {status}</em>
                            </div>
                            <div className={'card-body content-modal-tickets'}>
                                <h2>{title}</h2>
                                <p>{content}</p>
                            </div>
                            <div className={'card-footer'}>
                                <p>Priority: {priority}</p>
                            </div>
                        </div>
                    </div>
                </div>
        ,document.body) : null
}

export default ModalShowTickets;