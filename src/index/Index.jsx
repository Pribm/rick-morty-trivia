import axios from 'axios'
import React from 'react'
import Card from '../components/Card'
import './index.css'
import Slider from '../components/slider/Slider'

export default function Index() {

    const [state, setState] = React.useState({
        characters: [],
        page: 1,
    })

    const [isLoading, setLoading] = React.useState(true)
    const [isLoadingMore, setLoadingMore] = React.useState(false)
    const [sliderContainerHeight, setSliderContainerHeight] = React.useState(0)

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

    

    const changePage = () => {
        setState({...state, page: state.page+1})
        if(isLoadingMore){
            axios.get('https://rickandmortyapi.com/api/character?page='+state.page)
            .then(res => {
                setLoadingMore(false)
                let characters = res.data.results
                setState({...state, characters: state.characters.concat(characters)})
            })
        }
    }


    const scrollRef = (ref) => {
        if(ref.current.scrollLeft >= ref.current.scrollLeftMax - (ref.current.firstChild.clientWidth * 6)){
            //console.log('faz uma função que seta a query de página e insere o que for retornado da api no fim do array de personagens')
            setLoadingMore(true)
            changePage()
        }
    }

    return (
            (!isLoading) &&
                <Slider ref={slider} scrollRef={scrollRef}>
                    {state.characters.map((char, index) => (
                        <React.Fragment key={index}>
                            <Card
                            image={char.image}
                            title={char.name}
                            >
                                <h1>Status</h1>
                                <h1>Status</h1>
                                <h1>Status</h1>
                            </Card>
                        </React.Fragment>
                    ))}
                </Slider>
    )
}
