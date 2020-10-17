import React, {useEffect, useState} from "react";
import Menu from "../component/Menu";
import ModalTickets from "../component/ModalTickets";
import useModal from "../hook/useModal";
import {validate} from "../factory/jwt-auth";
import {getCookie} from "../factory/cookie";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ColCard from "../component/ColCard";
import CardTicket from "../component/CardTicket";

const Tickets = () => {
    const [show, toggle] = useModal();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const cookie = getCookie();
        if (cookie['token'] !== '') {
            validate(cookie['token']);
            fetch('http://localhost:8888/klorel/wp-json/klorel/v1/tickets/'+cookie['username'],
                {
                    method: 'GET',
                    headers: {Accept: 'application/json', Authorization: cookie['token']},
                }
            ).then( response => {if (response.status !== 200) throw new Error('HTTP STATUS'+response.status);
            return response.json();}
            ).then( json => {json.map((j, index) => j.index = index ); setPost(json)}
            ).catch( err => console.log(err) )
        } else {window.location.pathname = '/login';}
    },[]);

    /**Change la position des posts dans le tableau du state post**/
    const moveCard = (dragIndex, hoverIndex) => {
        const dragItem = post[dragIndex];
        const hoverItem = post[hoverIndex];
        console.log('dragItem', dragItem, 'hoverItem',hoverItem);
        if (dragItem) {
            setPost((prevState => {
                const copiedStateArray = [...prevState];
                console.log('copiedStateArray', copiedStateArray)
                const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
                console.log('prevItem',prevItem)
                copiedStateArray.splice(dragIndex, 1, prevItem[0]);
                console.log('copiedStateArray', copiedStateArray);
                return copiedStateArray;
            }))
        }
    }

    const returnPostColumn = (colName) => {
        return post
            .filter(p => p.status === colName)
            .map((p,index) => <CardTicket key={p.id} {...p} index={p.index} setPost={setPost} moveCard={moveCard}/>)
    }

    return (
        <div className='tickets'>
                <Menu bool={true}/>
                <h1>Tickets</h1>
                <button className='button button-tickets' onClick={toggle}>Nouveau Ticket</button>
                <ModalTickets show={show} hide={toggle} />
                <DndProvider backend={HTML5Backend}>
                    <div className="wrapper-dnd">
                        <ColCard title={"Nouveau"} >
                            {returnPostColumn("Nouveau")}
                        </ColCard>
                        <ColCard title={"Backlog"} >
                            {returnPostColumn("Backlog")}
                        </ColCard>
                        <ColCard title={"A faire"} >
                            {returnPostColumn("A faire")}
                        </ColCard>
                        <ColCard title={"En cours"} >
                            {returnPostColumn("En cours")}
                        </ColCard>
                        <ColCard title={"Validation client"} >
                            {returnPostColumn("Validation client")}
                        </ColCard>
                        <ColCard title={"Validé"} >
                            {returnPostColumn("Validé")}
                        </ColCard>
                        <ColCard title={"Archivé"} >
                            {returnPostColumn("Archivé")}
                        </ColCard>
                    </div>
            </DndProvider>
        </div>
    )
}

export default Tickets;