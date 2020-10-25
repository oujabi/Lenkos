import React from 'react';
import {useDrop} from 'react-dnd';
import {ItemTypes} from '../utils/ItemTypes';

const ColCard = ({title, children}) => {
    /*Les paramètre du composant ColCard sont appelé Props est elle permettent au différents composant de se passer des données ou des fonctions*/
    /*Les props ne peuvent pas être modifié et n'influence pas le cycle de vie du composant. Elle servent à l'affichage des données*/
/****************** Gestion du Drag and Drop ******************/
    const [ {isOver} ,drop] = useDrop({
            accept: ItemTypes.CARDTICKET,
            drop: () => ({name: title}),
            collect: monitor => ({
                isOver: monitor.isOver(),
            })
        });

/****************** Affichage des Données du composant ******************/
    return (
        <div ref={drop} style={{background : isOver ? 'yellow' : 'white'}} className={'col'}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}

export default ColCard;