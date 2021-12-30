import axios from 'axios'
import React from 'react'
import Card from '../components/card/Card'
import Slider from '../components/slider/Slider'
import './index.css'

import Loader from '../components/loader/Loader'

import {FaQuestionCircle, FaRegSmile, FaSkullCrossbones} from 'react-icons/fa'
import QuotesSection from './QuotesSection'


export default function Index() {

    const [state, setState] = React.useState({
        characters: [],
    })

    const [query, setQuery] = React.useState({
        name: '',
        dimension: '',
        status: '',
        page: 1
    })

    const [searching, setSearching] = React.useState(false)
    const [timer, setTimer] = React.useState(null)

    const [isLoading, setLoading] = React.useState(true)
    const [isLoadingMore, setLoadingMore] = React.useState(false)

    
    const [locations, setLocations] = React.useState([])

    const slider = React.useRef(null)

    React.useEffect(() => {

        document.title = document.title + ' - Characters'

        axios.get('https://rickandmortyapi.com/api/character?'+new URLSearchParams(query))
            .then(res => {
                if (typeof res !== 'undefined') {
                    setLoading(false)
                    let characters = res.data.results
                    setState({ ...state, characters: characters })
                }
            })
        
            loadLocations()

            return () => document.title = 'Rick and Morty trivia'

    }, [])

    React.useEffect(() => {
        if (isLoadingMore) {
            axios.get('https://rickandmortyapi.com/api/character?'+new URLSearchParams(query) )
                .then(res => {
                    setLoadingMore(false)
                    let characters = res.data.results
                    setState({ ...state, characters: state.characters.concat(characters) })
                })
        }

        if(searching){
            axios.get('https://rickandmortyapi.com/api/character?'+new URLSearchParams(query)).then(res => {
                if(typeof res !== 'undefined'){
                    if(res.status === 200){
                        setState({characters: res.data.results})
                        setSearching(false)
                    }
                }
            })
            .catch(error => {
                setSearching(false)
                setState({characters: []})
            })
        }
    }, [isLoadingMore, searching])


    const loadLocations = () => {
        let locationsArray = []

        axios.get('https://rickandmortyapi.com/api/location?page=1').then(res => {
            locationsArray.push(...res.data.results)
            for (let i = 2; i <= res.data.info.pages; i++) {
                axios.get('https://rickandmortyapi.com/api/location?page='+i).then(
                    res => {
                        locationsArray.push(...res.data.results)
                        if(i === res.data.info.pages - 1){
                            setLocations(locationsArray.sort((a,b) => a.name > b.name))
                        }
                    }
                )
                
            }
        })
    }

    const getResidents = id => {
        axios.get('https://rickandmortyapi.com/api/location/'+id).then(res => {
            if(res.data.residents.length !== 0){
                let charactersArray = []
                
                for(const resident of res.data.residents){
                    
                    axios.get(resident).then(res => {
                        charactersArray.push(res.data)
                        setState({characters: charactersArray.sort((a,b) => a.name > b.name)})
                    })
                }
            }

            setState({characters: []})
        })
    }



    const changePage = () => {
        setLoadingMore(true)
        setQuery({ ...query, page: query.page + 1 })
    }

    const filterCharacters = (event) => {
        setQuery({...query, name: event.target.value, page: 1})
    
        clearTimeout(timer)
    
        const newTimer = setTimeout(() => {
          setSearching(true)
        }, 500)
    
        setTimer(newTimer)
    }

    const filterCharStatus = (event, status) => {
        Object.keys(event.currentTarget.parentNode.children).forEach(key => {
            event.currentTarget.parentNode.children[key].classList.remove('active')
        })

       event.currentTarget.classList.add('active')

        setQuery({...query, status, page: 1})

        setSearching(true)
    }


    const scrollRef = (ref) => {
        if (ref.current.scrollLeft >= (ref.current.scrollWidth / 2)) {
            //console.log('faz uma função que seta a query de página e insere o que for retornado da api no fim do array de personagens')
            if (!isLoadingMore) {
                changePage()
            }
        }
    }

    return (
        (!isLoading) &&
            <>
            {(searching) &&
            <Loader/>}
            <div className="mt-5">
            
            <QuotesSection/>

            <div className="form-group mt-4 mb-3">
                <div className="container">
                    <div className="row p-2">
                        <h3 className='text-center text-uppercase' style={{color: 'orange', fontWeight: 'bolder'}}>Filter Character name or location</h3>
                        <div className="col-md-8">
                            <label>Search Character</label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder='Character name. Ex.: Morty Smith'
                            value={query.name}
                            onChange={(event) => {
                                setQuery({...query, name: event.target.value})
                                filterCharacters(event)
                            }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label>Search Location</label>
                                <select className='form-select'
                                    onChange={event => getResidents(event.target.value)}
                                >
                                    {locations.map((location, index) => (
                                        <option key={index} value={location.id}>{location.name}</option>
                                    ))}
                                </select>
                        </div>
                    </div>

                        <h5 style={{color: 'rgb(255, 165, 0)'}}>Status</h5>
                        <div className="d-flex justify-content-center">
                            
                            <div className="d-flex flex-column mx-5 align-items-center character-status" onClick={e => filterCharStatus(e, 'dead')}>
                                <FaSkullCrossbones className='status-icon'/>
                                <h4 className='text-uppercase h5 mt-2 status-text'>Dead</h4>
                            </div>

                            <div className="d-flex  flex-column mx-5 align-items-center character-status" onClick={e => filterCharStatus(e, 'alive')}>
                                <FaRegSmile className='status-icon'/>
                                <h4 className='text-uppercase h5 mt-2 status-text'>Alive</h4>
                            </div>

                            <div className="d-flex  flex-column mx-5 align-items-center character-status" onClick={e => filterCharStatus(e, 'unknown')}>
                                <FaQuestionCircle className='status-icon'/>
                                <h4 className='text-uppercase h5 mt-2 status-text'>Unknown</h4>
                            </div>
                        </div>

                </div>
            </div>

            {
                (state.characters.length !== 0) ?
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
            :
            <div className='d-flex justify-content-center'>
                <Card
                    image={'img/meeseks.jpg'}
                    name={'Nothing found!!!'}
                >
                    <h4>Get me outta here...</h4>
                    <div className='text-center'>
                    <strong className='text-success'>Existence is pain!</strong>
                    </div>
                </Card>
            </div>
            }
        </div>
        </>
    )
}
