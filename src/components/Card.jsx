import React from 'react'
import './card.css'

export default function Card(props) {
    return (

        <div className='custom-card m-2 d-flex flex-column align-items-center flex-grow-1 flex-shrink-0 bg-white' style={{width: '450px'}}>
                <img src={props.image} alt={props.alt} className='card-image'/>

                <div className='bg-letter text-center m-2' style={{ backgroundImage: "url('/img/Bg_card.png')", width: '95%'}}>
                    <h5 className="card-title-custom">{props.title}</h5>
                </div>

                <div className="card-text">{props.children}</div>

        </div>

    )
}
