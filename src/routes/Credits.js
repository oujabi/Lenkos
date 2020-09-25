import React, {useEffect, useState} from 'react';
import Intervention from "../component/Intervention";
import {getCookie} from "../factory/cookie";
import {Menu} from "../component/Menu";

const Credits = () => {
    const [pack, setPack] = useState([]);
    const [intervention, setIntervention] = useState([]);
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        let token = getCookie();
        /**Requête GET des packs*/
        fetch('http://localhost:8888/klorel/wp-json/wp/v2/tickets',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                }
            }
        ).then(response => {if (response.status !== 200) throw new Error(`HTTP STATUTS`+response.status);
        return response.json();}
        ).then(json => {
            let data = json;
            let tab =[];
            data.map(m => tab.push(
                {
                    id: m['id'],
                    temps: m['temps'],
                    content: m['title']['rendered'],
                    date: m['date_achat'],
                }
            ))
            setPack(tab);
        }).catch( err => console.log(err))

        /**Requête GET des interventions*/
        fetch('http://localhost:8888/klorel/wp-json/wp/v2/interventions',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                }
            }
        ).then(response => {if (response.status !== 200) throw new Error(`HTTP STATUTS`+response.status);
            return response.json();}
        ).then(json => {
            let data = json;
            let tab =[];
            data.map(m => tab.push(
                {
                    id: m['id']+1,
                    temps: m['temps'],
                    content: m['title']['rendered'],
                    date: m['date_intervention'],
                }
            ))
            setIntervention(tab)
        }).catch( err => console.log(err))
    },[]);

    useEffect(() => {
        /**Fusion des tableaux pack et intervention en utilisant le useEffect quand les states de pack et intervention sont mis à jour*/
        let tab = [...pack, ...intervention];

        /**Tri antichronologique des credits avec la méthode .sort*/
        const sortByMapped = (map,compareFn) => (a,b) => -compareFn(map(a),map(b));
        const toDate = e => Date.parse(e.date);
        const byValue = (a,b) => a - b;
        const byDate = sortByMapped(toDate,byValue);
        setCredits([...tab].sort(byDate));

        },[pack, intervention]);

    return (
        <div className='wrapper credits'>
            <Menu />
            <h1>Credits temps</h1>
            <div className='timer'>
                <h2>Votre crédits temps actuel</h2>
                <div className='content-timer'>
                    31H15
                </div>
            </div>
            <button className='button credits-button'>Acheter des heures</button>
            <div className='wrap-intervention'>
                {
                    credits.map(p => <Intervention key={p['id']} {...p}/>)
                }
            </div>
        </div>
    )
}

export default Credits;