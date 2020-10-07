import React from "react";

function CardTicket ({title, status, priority, content}) {

    return (
        <div className="card-post">
            <div className={"card-header"}>
                <em>Status: {status}</em>
            </div>
            <div className={"card-body"}>
                <h2>{title}</h2>
                {content}
            </div>
            <div className="card-footer">
                <p>Priority: {priority}</p>
            </div>
        </div>
    )
}

export default CardTicket;