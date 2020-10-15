import React, {useContext, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "../item/ItemTypes";
import {CardContext} from "../routes/Tickets";

function CardTicket ({id, title, status, priority, content}) {
    const [, drop] = useDrop({
        accept: ItemTypes.CARDTICKET,
        hover (item, monitor) {
            console.log( 'i"m hover')
        }
    })

    const {markNewPriority} = useContext(CardContext);
    const ref = useRef(null);

    const [{opacity}, drag] = useDrag( {
            item: {
                type: ItemTypes.CARDTICKET,
                id: id,
                },
        end: (item, monitor) => {
            markNewPriority(item.id, monitor.getDropResult())
        },
        collect : (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
        })
    })

    drag(drop(ref));

    return (
        <div ref={ref} style={{opacity}} className="card-post">
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