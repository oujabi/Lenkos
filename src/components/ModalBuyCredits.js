import React from 'react';
import ReactDOM from 'react-dom';
import {allowOverflow} from '../utils/overflow';

const ModalBuyCredits = ( {show, hide} ) => {

/****************** Affichage des données du composant ******************/
    return show ?
            ReactDOM.createPortal(
                <div className={'wrap-modal'}>
                    <div className={'modal'}>
                        <div className={'Xclose'} onClick={ () => { allowOverflow(); hide() } }>X</div>
                        <div className={'modal-content'}>
                          Buy credits soon ....
                        </div>
                    </div>
                </div>
            ,document.body) : null
}

export default ModalBuyCredits;
