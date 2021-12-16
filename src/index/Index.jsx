import axios from 'axios'
import React from 'react'
import Card from '../components/Card'
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
                                <div className="d-flex ">
                                    <div className="p-2 rounded-2 m-2 text-center" style={{backgroundColor: '#b2dae4'}}>
                                    <h6 className='me-2'>Status</h6>
                                    <hr className='m-0'/>
                                    <div className="d-flex align-items-center justify-content-center" style={{height: '60px'}}>
                                        <h6 className='mt-1' style={{fontSize: '.7em'}}>{char.status}</h6>
                                    </div>
                                    </div>

                                    <div className="p-2 rounded-2 m-2 text-center" style={{backgroundColor: '#f8fe76'}}>
                                    <h6 className='me-2'>Species</h6>
                                    <hr className='m-0'/>
                                    <div className="d-flex align-items-center justify-content-center" style={{height: '60px'}}>
                                        <h6 className='mt-1' style={{fontSize: '.7em'}}>{char.species}</h6>
                                    </div>
                                    </div>

                                    <div className=" p-2 rounded-2 m-2 text-center" style={{backgroundColor: '#f9d9ca'}}>
                                    <h6 className='me-2'>Origin</h6>
                                    <hr className='m-0'/>
                                    <div className="d-flex align-items-center justify-content-center" style={{height: '60px'}}>
                                        <h6 className='mt-1' style={{fontSize: '.7em'}}>{char.origin.name}</h6>
                                    </div>
                                    </div>
                                </div>
                            </Card>
                        </React.Fragment>
                    ))}
                </Slider>
    )
}
