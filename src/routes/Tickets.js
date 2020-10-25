import React, {useEffect, useState} from 'react';
import useModal from '../utils/useModal';
import {resetOverflow} from '../utils/overflow';
import Menu from '../components/Menu';
import ModalTickets from '../components/ModalTickets';
import ColCard from '../components/ColCard';
import CardTicket from '../components/CardTicket';
import ModalShowTickets from '../components/ModalShowTickets';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {getTicket, updateTicket} from '../factory/API';



const Tickets = () => {
/****************** Initialisation des différentes "State" avec l'utilisation des "hooks" useState (hook natif) et useModal (hook custom)******************/
/*Les States sont des paramètres interne des composants. Ils permettent la mise à jour du composant (cycle de vie des composants).*/
/*Les Hooks sont des fonctions commençant par 'use' et permettant la gestion des states
[nomDustate (contient la valeur du state), setNomDuState (permet de changer la valeur du state)]*/
/*Les Hooks custom comme useModal permettent d'extraire une logique de composant afin de pouvoir la réutiliser*/
    const [ticket, setTicket] = useState([]);
    const [bool, setBool] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [showTicket, toggleTicket] = useModal();
    const [show, toggle] = useModal();

/****************** Gestion du cycle de vie du composant et envoie des données à l'API ******************/
/*useEffect est un hook natif qui permet de déclencher du code à un moment précis du cycle de vie du composant*/
/*Le tableau des dépendances étant vide le code se déclenche à chaque évènement componentDidMount (phase de montage du composant)*/
    useEffect(() => { getTicket(setTicket) },[]);

/*tableau des dépendances contient les states bool et ticket le code se déclenche durant l'évènement componentDidUpdate (phase de Mise à jour du composant)
quand la valeur des states bool et ticket est modifié*/
    useEffect(() => {
        if (bool) {
            ticket.map((t, index) => t.index = index);
            updateTicket(ticket);
            setBool(false);
        }
    }, [bool, ticket])

/****************** Gestion du Drag and Drop ******************/
    const moveCard = (dragIndex, hoverIndex) => {
        const dragItem = ticket[dragIndex];
        if (dragItem) {
            setTicket(prevState => {
                const copiedStateArray = [...prevState];
                const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
                copiedStateArray.splice(dragIndex, 1, prevItem[0]);
                return copiedStateArray;
            })
        }
    }

/****************** Gestion des données du composant ******************/
    const dataModalTicket = (title, status, content, priority) => {
        setDataModal({
            'status': status,
            'title': title,
            'content': content,
            'priority': priority,
        });
    }

    const returnPostColumn = (colName) => {
        return ticket
            .filter( t => t.status === colName )
            .map( t =>
                <CardTicket key={t.id} {...t} setTicket={setTicket} setBool={setBool} toggle={toggleTicket} moveCard={moveCard} dataModalTicket={dataModalTicket} /> )
    }

/****************** Affichage des données du composant ******************/
    return (
        <div className='tickets'>
                <Menu current={'Tickets'}/>
                <h1>Tickets</h1>
                <button className={'button button-tickets'} onClick={ () => {resetOverflow(); toggle()} }>Nouveau Ticket</button>
                <ModalTickets show={show} hide={toggle} />
                <ModalShowTickets show={showTicket} hide={toggleTicket} {...dataModal} />
                <DndProvider backend={HTML5Backend}>
                    <div className={'wrapper-dnd'}>
                        <ColCard title={'Nouveau'} >
                            {returnPostColumn('Nouveau')}
                        </ColCard>
                        <ColCard title={'Backlog'} >
                            {returnPostColumn('Backlog')}
                        </ColCard>
                        <ColCard title={'A faire'} >
                            {returnPostColumn('A faire')}
                        </ColCard>
                        <ColCard title={'En cours'} >
                            {returnPostColumn('En cours')}
                        </ColCard>
                        <ColCard title={'Validation client'} >
                            {returnPostColumn('Validation client')}
                        </ColCard>
                        <ColCard title={'Validé'} >
                            {returnPostColumn('Validé')}
                        </ColCard>
                        <ColCard title={'Archivé'} >
                            {returnPostColumn('Archivé')}
                        </ColCard>
                    </div>
            </DndProvider>
        </div>
    )
}

export default Tickets;