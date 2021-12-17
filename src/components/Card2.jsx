import React from 'react'
import './card.css'

export default function Card(props) {

    return (
        <>

            {(window.screen.width <= 500) &&
                (<div className='custom-card m-2 d-flex flex-column align-items-center flex-grow-1 flex-shrink-0 bg-white' style={{width: '150px'}}>
                    <img src={props.image} alt={props.alt} className='card-image'/>
                    <div className='bg-letter text-center mt-3 mb-2' style={{ backgroundImage: window.screen.width > 500 && "url('/img/Bg_card.png')", width: '85%'}}>
                        <h5 className="card-title-custom">{props.title}</h5>
                    </div>
                    <div className="card-text">{props.children}</div>
                </div>)
            }

            {(window.screen.width > 500) &&
                (<div className='custom-card m-2 d-flex flex-column align-items-center flex-grow-1 flex-shrink-0 bg-white' style={{width: '350px'}}>
                    <img src={props.image} alt={props.alt} className='card-image'/>
                    <div className='bg-letter text-center mt-3 mb-2' style={{ backgroundImage: "url('/img/Bg_card.png')", width: '85%'}}>
                        <h5 className="card-title-custom">{props.title}</h5>
                    </div>

                    <div style={{width: '100%'}}>{props.children}</div>
                </div>)
            }
        </>
    )
}
