import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {ItemTypes} from '../utils/ItemTypes';
import {resetOverflow} from '../utils/overflow';

const CardTicket = ({id, title, status, content, priority, index, setTicket, moveCard, toggle, dataModalTicket, setBool}) => {
/****************** Gestion du Drag and Drop ******************/
    const changePostColumn = (currentPost, status) => {
        if (status !== null) {
            setTicket(prevState => {
                return prevState.map( e => { return {...e, status: e.id === currentPost.id ? status.name : e.status} } )
            })
        }
    }

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARDTICKET,
            hover(item, monitor) {
                if (!ref.current) {
                    return;
                }

                const dragIndex = item.index;
                const hoverIndex = index;
                // // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    return;
                }
                // // Determine rectangle on screen
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                // // Get vertical middle
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                // // Determine mouse position
                const clientOffset = monitor.getClientOffset();
                // // Get pixels to the top
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                // // Only perform the move when the mouse has crossed half of the items height
                // // When dragging downwards, only move when the cursor is below 50%
                // // When dragging upwards, only move when the cursor is above 50%
                // // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                // // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                // // Time to actually perform the action

                moveCard(dragIndex, hoverIndex);
            },
        })

    const [{isDragging}, drag] = useDrag( {
            item: {
                type: ItemTypes.CARDTICKET,
                id: id,
                index: index,
                status: status,
                title: title,
                },
        end: (item, monitor) => {
            changePostColumn(item, monitor.getDropResult());
            setBool(true);
        },
        collect : (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
        })
    })

    drag(drop(ref));

/****************** Affichage des données du composant ******************/
    return (
        <div ref={ref} style={{opacity : isDragging ? 0.4 : 1}} onClick={() => {toggle(); dataModalTicket(title, status, content, priority); resetOverflow() }}
             className={'card-post'}>
            <div className={'card-header'}>
                <em>Status: {status}</em>
            </div>
            <div className={'card-body'}>
                <h2>{title}</h2>
            </div>
            <div className={'card-footer'}>
                <p>Priority: {priority}</p>
            </div>
        </div>
    )
}

export default CardTicket;