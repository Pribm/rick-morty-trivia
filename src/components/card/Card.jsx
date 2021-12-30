import React from 'react'

import './card.css'

import {useNavigate} from 'react-router-dom'

export default function Card(props) {

    const navigate = useNavigate()

    const toEpisodes = () => {
        navigate('/episodes', {state: props.eps})
    }

    return (
        <div className="card align-items-center">
            <div className='color-top'></div>
            <img src={props.image} alt="..." className='card-image'/>

            <h5 className='card-name'>{props.name}</h5>

            {(props.location && props.status) ? 
                <>
                <h6>Location: {props.location}</h6>
                <hr className='divider'/>
                <h6>Status: {props.status}</h6>
                </>
                :
                <div>
                    {props.children}
                </div>
            }

            {
                props.eps &&

                <div className="episodes d-flex align-items-center" onClick={() => toEpisodes()}>
                    <div className='portal-gun'>
                        <img src="img/portal_gun__rick_and_morty__by_noctasun_dc9c63x-fullview.png" alt="..." />
                    </div>
                    <h5>Episodes</h5>
                </div>
            }
        </div>
    )
}
