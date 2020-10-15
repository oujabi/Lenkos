import React, {createContext, useEffect, useState} from "react";
import Menu from "../component/Menu";
import ModalTickets from "../component/ModalTickets";
import useModal from "../hook/useModal";
import {validate} from "../factory/jwt-auth";
import {getCookie} from "../factory/cookie";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ColCard from "../component/ColCard";

export const CardContext = createContext({
    markNewPriority: null
})


function Tickets () {
    const [show, toggle] = useModal();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const cookie = getCookie();
        console.log(cookie['username']);
        if (cookie['token'] !== '') {
            validate(cookie['token']);
            fetch('http://localhost:8888/klorel/wp-json/klorel/v1/tickets/'+cookie['username'],
                {
                    method: 'GET',
                    headers: {Accept: 'application/json', Authorization: cookie['token']},
                }
            ).then( response => {if (response.status !== 200) throw new Error('HTTP STATUS'+response.status);
            return response.json();}
            ).then( json => {setPost(json)}
            ).catch( err => console.log(err) )
        } else {window.location.pathname = '/login';}
    },[]);

    const markNewPriority = (id, data) => {
        const ticket = post.filter(p => p.id === id)
        const allTicket = post.filter(p => p.id !== id)
        ticket[0].status = data.name;
        allTicket.push(ticket[0]);

        setPost(allTicket);
    }

    return (
        <div className='tickets'>
            <DndProvider backend={HTML5Backend}>
                <Menu bool={true}/>
                <h1>Tickets</h1>
                <button className='button button-tickets' onClick={toggle}>Nouveau Ticket</button>
                <ModalTickets show={show} hide={toggle} />
                <CardContext.Provider value={{markNewPriority}}>
                    <div className="wrapper-dnd">
                        <ColCard title={"Nouveau"} post={post} />
                        <ColCard title={"Backlog"} post={post} />
                        <ColCard title={"A faire"} post={post} />
                        <ColCard title={"En cours"} post={post} />
                        <ColCard title={"Validation client"} post={post} />
                        <ColCard title={"Validé"} post={post} />
                        <ColCard title={"Archivé"} post={post} />
                    </div>
                </CardContext.Provider>
            </DndProvider>
        </div>
    )
}

export default Tickets;