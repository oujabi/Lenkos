import React from 'react';
import ReactDOM from 'react-dom';

const ModalShowCredits = ({show, hide, data, allowOverflow}) => {
    return show ? ReactDOM.createPortal(
        <div className='wrap-modal'>
            <div className='modal'>
                <div className='Xclose' onClick={() => {hide(); allowOverflow()}}>X</div>
                <div className='modal-content'>
                    <h3>{data.date}</h3>
                    <em className={data.operation}>{data.temps}</em>
                    <p>{data.title}</p>
                    <p>{data.type}</p>
                </div>
            </div>
        </div>
        ,document.body) : null
}

export default ModalShowCredits;