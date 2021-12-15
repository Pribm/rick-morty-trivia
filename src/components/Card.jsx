import React from 'react'

export default function Card(props) {
    return (

        <div className="card" style={{width: props.width, }}>
            <img className='card-image-top' src={props.image} alt={props.alt} />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <div className="card-text">{props.text}</div>
            </div>
        </div>

    )
}
