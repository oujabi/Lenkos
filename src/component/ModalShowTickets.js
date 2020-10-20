import React from 'react';
import ReactDOM from 'react-dom';

const ModalShowTickets = ({show, hide, data}) => {
    return (show ? ReactDOM.createPortal(
        <div className='wrap-modal'>
            <div className='modal'>
                <div className='Xclose' onClick={hide}>X</div>
                <div className='modal-content'>
                    <div className={"card-header"}>
                        <em>Index : {data.index}</em>
                        <em>Status: {data.status}</em>
                    </div>
                    <div className={"card-body"}>
                        <h2>{data.title}</h2>
                        {data.content}
                    </div>
                    <div className="card-footer">
                        <p>Priority: {data.priority}</p>
                    </div>
                </div>
            </div>
        </div>
    ,document.body): null)
}

export default ModalShowTickets;