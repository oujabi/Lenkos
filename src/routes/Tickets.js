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
import ModalShowTickets from "../component/ModalShowTickets";

const Tickets = () => {
    const [temp, setTemp] = useState(false);
    const [show, toggle] = useModal();
    const [showTicket, toggleTicket] = useModal();
    const [post, setPost] = useState([]);
    const [data, setData] = useState({});

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
            ).then( json => {json.map((j, index) => j.index = index ); console.log(json); setPost(json)}
            ).catch( err => console.log(err) )
        } else {window.location.pathname = '/login';}
    },[]);

    useEffect(() => {
        if (temp) {
            console.log('scsdcdscsdcds', post);
            post.map((m, index) => m.index = index);
            console.log('prerequest',post);
            fetch('http://localhost:8888/klorel/wp-json/klorel/v1/update/tickets',
                {
                    method: 'POST',
                    body: JSON.stringify(post),
                })
                .then((response) => console.log(response.status));
            setTemp(false);
        }
    }, [temp, post])

    const moveCard = (dragIndex, hoverIndex) => {
        const dragItem = post[dragIndex];
        // const hoverItem = post[hoverIndex];
        // console.log('dragItem', dragItem, 'hoverItem',hoverItem);
        if (dragItem) {
            setPost((prevState => {
                console.log('Switch card');
                const copiedStateArray = [...prevState];
                // console.log('copiedStateArray', copiedStateArray)
                const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
                // console.log('prevItem',prevItem)
                copiedStateArray.splice(dragIndex, 1, prevItem[0]);
                // console.log('copiedStateArray', copiedStateArray);
                console.log('copiedStateArray', copiedStateArray);
                return copiedStateArray;
            }))
        }
    }

    function dataModalTicket (title, status, content, priority) {
        setData({
            'status': status,
            'title': title,
            'content': content,
            'priority': priority,
        });
    }

    const returnPostColumn = (colName) => {
        console.log('avant affichage', post);
        return post
            .filter(p => p.status === colName)
            .map((p,index) => <CardTicket key={p.id} {...p} setPost={setPost} moveCard={moveCard}
          toggle={toggleTicket} getData={dataModalTicket} resetOverflow={resetOverflow} setTemp={setTemp}/>)
    }

    const resetOverflow = () => {
        window.scrollTo(0,0);
        document.body.style = 'overflow: hidden';
    }

    const allowOverflow = () => {
        document.body.style = 'overflow: auto';
    }

    return (
        <div className='tickets'>
                <Menu current={'Tickets'}/>
                <h1>Tickets</h1>
                <button className='button button-tickets' onClick={() => {resetOverflow(); toggle()}}>Nouveau Ticket</button>
                <ModalTickets show={show} hide={toggle} allowOverflow={allowOverflow}/>
                <ModalShowTickets show={showTicket} hide={toggleTicket} data={data} allowOverflow={allowOverflow}/>
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