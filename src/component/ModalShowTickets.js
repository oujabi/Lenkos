import React from 'react';
import ReactDOM from 'react-dom';

const ModalShowTickets = ({show, hide, data}) => {
    const allowOverflow = () => {
        document.body.style = 'overflow: auto';
    }

    return (show ? ReactDOM.createPortal(
        <div className='wrap-modal '>
            <div className='modal'>
                <div className='Xclose' onClick={() => {allowOverflow(); hide(); }}>X</div>
                <div className='modal-content'>
                    <div className={"card-header"}>
                        <em>Index : {data.index}</em>
                        <em>Status: {data.status}</em>
                    </div>
                    <div className={"card-body content-modal-tickets"}>
                        <h2>{data.title}</h2>
                        <p>{data.content}</p>
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