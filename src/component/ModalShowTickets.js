import React from 'react';
import ReactDOM from 'react-dom';

const ModalShowTickets = ({show, hide}) => {
    return (show ? ReactDOM.createPortal(
        <div className='wrap-modal'>
            <div className='modal'>
                <div className='Xclose' onClick={hide}>X</div>
                <div className='modal-content'>

                   I'm a modal show ticket
                </div>
            </div>
        </div>
    ,document.body): null)
}

export default ModalShowTickets;