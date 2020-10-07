import React, {useEffect, useState} from "react";
import Menu from "../component/Menu";
import CardTicket from "../component/CardTicket";
import ModalTickets from "../component/ModalTickets";
import useModal from "../hook/useModal";
import {validate} from "../factory/jwt-auth";
import {getCookie} from "../factory/cookie";

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

    return (
        <div className='tickets'>
            <Menu bool={true}/>
            <h1>Tickets</h1>
            <button className='button button-tickets' onClick={toggle}>Nouveau Ticket</button>
            <ModalTickets show={show} hide={toggle} />
            <div className="card-container">
                {
                    post.map(m => <CardTicket key={m.id} {...m} /> )
                }
            </div>
        </div>
    )
}

export default Tickets;