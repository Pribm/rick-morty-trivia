import axios from 'axios'
import React from 'react'
import Card from '../components/Card'

export default function Index() {

    const [state, setState] = React.useState({
        characters: [],
    })

    React.useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
        .then(res => {
            if(typeof res !== 'undefined'){
                setState({...state, characters: res.data.results})
            }
        })
    }, [])

    return (
        <div>
            {(state.characters) &&
                state.characters.map((char, index) => (
                    <React.Fragment key={index}>
                        <div className="d-flex flex-row flex-nowrap bg-danger m-2">
                            <Card
                                image={char.image}
                                title={char.name}
                                width={'18rem'}
                            />
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
    )
}
