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
            <div className="d-flex flex-wrap justify-content-center mt-2">
                {
                    state.characters.map((char, index) => (
                        <React.Fragment>
                            <Card
                            image={char.image}
                            title={char.name}
                            width={'19rem'}
                            />
                        </React.Fragment>
                    ))
                }
            </div>
            
            }
        </div>
    )
}
