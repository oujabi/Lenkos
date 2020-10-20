import React from 'react';

const Intervention = ({date, title, temps, operation, type, getData, toggle}) => {
    return(
        <div onClick={() => {toggle(); getData(date, title, temps, operation, type)}} className="intervention">
            <h3>{date}</h3>
            <em className={operation}>{temps}</em>
            <p>{title}</p>
            <p>{type}</p>
        </div>
    )
}

export default Intervention;