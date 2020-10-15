import React from "react";
import CardTicket from "./CardTicket";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../item/ItemTypes";

function ColCard ({title, post}) {

    const [ {isOver} ,drop] = useDrop({
            accept: ItemTypes.CARDTICKET,
            drop: () => ({name: title}),

            collect: monitor => ({
                isOver: monitor.isOver()
            })
        }
    );

    return (
        <div ref={drop} style={{background : isOver ? 'yellow' : 'white'}} className='col'>
            <h2>{title}</h2>
                <div>
                    {
                        post.map(m =>  (m.status === title) ? <CardTicket key={m.id} {...m} /> : null)
                    }
                </div>
        </div>
    )
}

export default ColCard;