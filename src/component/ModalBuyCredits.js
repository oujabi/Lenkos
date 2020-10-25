import React from 'react';
import ReactDOM from 'react-dom';

const ModalBuyCredits = ({show, hide, allowOverflow}) => {
    return show ? ReactDOM.createPortal(
        <div className='wrap-modal'>
            <div className='modal'>
                <div className='Xclose' onClick={() => {hide(); allowOverflow()}}>X</div>
                <div className='modal-content'>
                  Buy credits soon ....
                </div>
            </div>
        </div>
    ,document.body) : null
}

export default ModalBuyCredits;
