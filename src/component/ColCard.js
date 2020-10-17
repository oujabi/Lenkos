import React from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../item/ItemTypes";

const ColCard = ({children, title}) => {

    const [ {isOver} ,drop] = useDrop({
            accept: ItemTypes.CARDTICKET,
            drop: () => ({name: title}),
            collect: monitor => ({
                isOver: monitor.isOver(),
            })
        });

    return (
        <div ref={drop} style={{background : isOver ? 'yellow' : 'white'}} className='col'>
            <h2>{title}</h2>
            {children}
        </div>
    )
}

export default ColCard;