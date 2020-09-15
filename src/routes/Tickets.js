import React, {useEffect, useState} from "react";
import {getCookie} from "../factory/cookie";
import PostComponent from "../component/PostComponent";
import Modal from "../component/Modal";
import useModal from "../Hook/useModal";

const Tickets = () => {
    const [show, toggle] = useModal();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const token = getCookie();
        let bearer = 'Bearer '+token+''
        fetch('http://localhost:8888/wordpress-test/wp-json/wp/v2/posts?status=publish',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: bearer,
                }
            }
        ).then( response => {if (response.status !== 200) throw new Error('HTTP STATUS'+response.status); return response.json();}
        ).then( json => {
            let data = json;
            let tab =[];
            data.map(d => {
                /**Retire balises <p></p> de la chaine de caractère*/
                let content = d.content['rendered'].replace("<p>", '');
                content = content.replace("</p>", '');
                /** */
                tab.push(
                    {
                        "id": d.id,
                        "author": d.author,
                        "categorie": d.categorie,
                        "content": content,
                        "date": d.date,
                        "status": d.status,
                        "title": d.title['rendered'],
                        "type": d.type,
                    })
                return tab;
            })
            setPost(tab);
        }
        ).catch( err => console.log(err) )
    },[]);

    function handleLogOut () {
        window.location.pathname = "/";
    }

    function handleClick () {
        window.location.pathname = '/portfolios'
    }

    return (
        <div className='tickets'>
            <h1>Tickets</h1>
            <button className='button button-tickets' onClick={toggle}>Nouveau Ticket</button>
            <div className='list-button'>
                <button className='button'>Refonte boutique 1.7</button>
                <button className='button'>Maintenance WordPress</button>
                <button className='button'>Maintenance Prestashop</button>
            </div>
            <Modal show={show} hide={toggle} />
            <button onClick={handleLogOut}>log out</button>
            <div className="card-container">
                {
                    post.map(m => <PostComponent key={m.id} {...m} /> )
                }
            </div>
            <button onClick={handleClick}>Porfolios</button>
        </div>
    )
}

export default Tickets;