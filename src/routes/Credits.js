import React, {useEffect, useState} from 'react';
import Intervention from "../component/Intervention";
import {getCookie} from "../factory/cookie";
import {Menu} from "../component/Menu";

const Credits = () => {
    const [credits, setCredits] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let token = getCookie();
        /**Requête GET des credits d'un ticket*/
        fetch('http://localhost:8888/klorel/wp-json/klorel/v1/tickets',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                }
            }
        )
            .then(response => {if (response.status !== 200) throw new Error(`HTTP STATUTS`+response.status);
                return response.json();})
            .then( json => {
                setCredits(json['credits']);
                setTotal(json['total_credits'])
            })
            .catch( err => console.log(err))
    },[]);

    return (
        <div className='wrapper credits'>
            <Menu />
            <h1>Credits temps</h1>
            <div className='timer'>
                <h2>Votre crédits temps actuel</h2>
                <div className='content-timer'>{total}</div>
            </div>
            <button className='button credits-button'>Acheter des heures</button>
            <div className='wrap-intervention'>
                {
                    credits.map(p => <Intervention key={p['id']} {...p} />)
                }
            </div>
        </div>
    )
}

export default Credits;