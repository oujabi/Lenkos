import React from 'react';
import Intervention from "../component/Intervention";

const Credits = () => {
    return (
        <div className='wrapper credits'>
            <h1>Credits temps</h1>
            <div className='timer'>
                <h2>Votre crédits temps actuel</h2>
                <div className='content-timer'>
                    31H15
                </div>
            </div>
            <button className='button credits-button'>Acheter des heures</button>
            <div className='wrap-intervention'>
                <Intervention />
            </div>
        </div>
    )
}

export default Credits;