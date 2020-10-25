import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import Intervention from "../components/Intervention";
import useModal from "../utils/useModal";
import ModalBuyCredits from "../components/ModalBuyCredits";
import ModalShowCredits from "../components/ModalShowCredits";
import {getIntervention} from "../factory/API";
import {resetOverflow} from "../utils/overflow";

const Credits = () => {
/****************** Initialisation des différents "State" avec l'utilisation des "hooks" useState (hook natif) et useModal (hook custom)******************/
    const [show, toggle] = useModal();
    const [showCredits, toggleCredits] = useModal();
    const [credits, setCredits] = useState([]);
    const [total, setTotal] = useState(0);
    const [modalCredit, setModalCredit] = useState([]);

/****************** Gestion du cycle de vie du composant et envoie des données à l'API ******************/
    useEffect(() => { getIntervention(setCredits, setTotal) },[]);

/****************** Permet la mise à jour des states permettant l'envoie des données à la modal D'affichage ******************/
    const dataModalCredits = (date, title, temps, operation, type) => {
        setModalCredit({
            'date': date,
            'title': title,
            'temps': temps,
            'operation': operation,
            'type': type,
        });
    }

/****************** Affichage des Données du composant ******************/
    return (
        <div className={'wrapper credits'}>
            <Menu current={'Credits'}/>
            <ModalBuyCredits show={show} hide={toggle} />
            <ModalShowCredits {...modalCredit} show={showCredits} hide={toggleCredits} />
            <h1>Credits temps</h1>
            <div className={'timer'}>
                <h2>Votre crédits temps actuel</h2>
                <div className={'content-timer'}>{total}</div>
            </div>
            <button onClick={() => {resetOverflow(); toggle() }} className={'button credits-button'}>Acheter des heures</button>
            <div className={'wrap-intervention'}>
                {
                    credits.map(c => <Intervention key={c.id} {...c} dataModalCredits={dataModalCredits} toggle={toggleCredits}/>)
                }
            </div>
        </div>
    )
}

export default Credits;