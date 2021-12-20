import axios from 'axios'
import React from 'react'
import Card from '../components/card/Card'
import Slider from '../components/slider/Slider'

export default function Index() {

    const [state, setState] = React.useState({
        characters: [],
        page: 1,
    })

    const [isLoading, setLoading] = React.useState(true)
    const [isLoadingMore, setLoadingMore] = React.useState(false)

    const slider = React.useRef(null)

    React.useEffect(() => {

        axios.get('https://rickandmortyapi.com/api/character?page='+state.page)
        .then(res => {
            if(typeof res !== 'undefined'){
                setLoading(false)
                let characters = res.data.results
                setState({...state, characters: characters})
            }
        })
    }, [])

    React.useEffect(() => {
        if(isLoadingMore){
            axios.get('https://rickandmortyapi.com/api/character?page='+state.page)
            .then(res => {
                setLoadingMore(false)
                let characters = res.data.results
                setState({...state, characters: state.characters.concat(characters)})
            })
        }
    }, [isLoadingMore])

    

    const changePage = () => {
        setLoadingMore(true)
        setState({...state, page: state.page+1})
    }


    const scrollRef = (ref) => {
        if(ref.current.scrollLeft >= (ref.current.scrollWidth / 2)){
            //console.log('faz uma função que seta a query de página e insere o que for retornado da api no fim do array de personagens')
            if(!isLoadingMore) {
                changePage()
            }
        }
    }

    return (
            (!isLoading) &&
                <Slider ref={slider} scrollRef={scrollRef}>
                    {state.characters.map((char, index) => (
                        <React.Fragment key={index}>
                            <Card
                            image={char.image}
                            name={char.name}
                            location={char.location.name}
                            status={char.status}
                            eps={char.episode}
                            >
                            </Card>
                        </React.Fragment>
                    ))}
                </Slider>
    )
}
