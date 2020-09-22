import React from 'react';

const Intervention = ({date, temps, content}) => {
    return(
        <div className='intervention'>
            <h3>{date}</h3>
            <em>{temps}</em>
            <p>{content}</p>
        </div>
    )
}

export default Intervention;