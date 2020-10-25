import React from 'react';
import {resetOverflow} from '../utils/overflow';

const Intervention = ({date, operation, temps, title, type, dataModalCredits, toggle}) => {

/****************** Affichage des Données du composant ******************/
    return(
        <div onClick={ () => {dataModalCredits(date, title, temps, operation, type); resetOverflow(); toggle()} } className={'intervention'}>
            <h3>{date}</h3>
            <em className={operation}>{temps}</em>
            <p>{title}</p>
            <p>{type}</p>
        </div>
    )
}

export default Intervention;