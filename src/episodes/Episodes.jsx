import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'
import './episodes.css'
import tvThumbs from './tv_thumbs'
import {gsap} from 'gsap'
import { Tabs, Tab } from '@material-ui/core'
import MobileEpisodePlaylist from './MobileEpisodePlaylist'


export default function Episodes() {

    const location = useLocation()

    const [episodes, setEpisodes] = React.useState({})
    const [seasonEpisodes, setSeasonEpisodes] = React.useState([])

    const [selectedSeason, setSelectedSeason] = React.useState(0)
    const [selectedEpisode, setselectedEpisode] = React.useState(0)

    const [loading, setLoading] = React.useState(true)
    const [tv, setTv] = React.useState(true)
    const [showMobileEpisode, setShowMobileEpisode] = React.useState(false)

    const tvScreen = React.useRef()

    React.useEffect(() => {

        document.title = document.title + ' - Episodes'
        
        let epList = []

        if(location.state){
            location.state.forEach((episode, index, array) => {
                axios.get(episode).then(res => {
                    epList.push(
                        {
                            season: Number(res.data.episode.replace(/E(.*)/,'').replace('S', '')),
                            ep: {
                                name: res.data.name,
                                episode: Number(res.data.episode.replace(/^(.*?)E/, ''))
                            }
                        }
                    )
    
                    setEpisodes({epList})
                    if(index === array.length - 1){
                        setLoading(false)
                    }
                })
            });
        }else{
            axios.get('https://rickandmortyapi.com/api/episode').then(res => {
                let fetchEpisodes = []
                fetchEpisodes = res.data.results
                
                for(let i = 2; i <= res.data.info.pages; i++){
                    axios.get('https://rickandmortyapi.com/api/episode?page='+i).then(res => {
                        fetchEpisodes.push(...res.data.results)
                        
                        if(i === res.data.info.pages){
                            fetchEpisodes.forEach((episode, index, array) => {
                                epList.push(
                                    {
                                        season: Number(episode.episode.replace(/E(.*)/,'').replace('S', '')),
                                        ep: {
                                            name: episode.name,
                                            episode: Number(episode.episode.replace(/^(.*?)E/, ''))
                                        }
                                    }
                                )
                
                                setEpisodes({epList})
                                if(index === array.length - 1){
                                    setLoading(false)
                                }
                            })
                        }
                    })
                }   
            })
        }

        return () => document.title = 'Rick and Morty trivia'
        
        //eslint disable-next-line react-hooks/exhaustive-deps
    },[])

    React.useEffect(() => {

        let result = {};
        if(!loading) {

            for (const ep of episodes.epList){
                let obj_episode = ep.ep

                if(result[ep.season]){
                    result[ep.season].episodes.push(obj_episode)
                }else{
                    result[ep.season] = {
                        season: ep.season,
                        episodes: [obj_episode]
                    }
                }
            }
            
            result = Object.values(result);
            result.forEach(r => r.episodes.sort(((a,b) => a.episode > b.episode)))

            setSeasonEpisodes(result)
        }
        //eslint disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const getSiblings = event => {
        let siblings = []
        if(!event.target.parentNode){
            return siblings;
        }
        let sibling  = event.target.parentNode.firstChild;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== event) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    }

    const selectSeason = (seasonId, event) => {
        setSelectedSeason(seasonId)
        setTv(true)
        gsap.to(tvScreen.current, {width: '36%', height: '45%', position: 'absolute', top: '20%', right: '32%', ease: 'expo' })
        let timeChange = 0

        document.getElementById(`tab${seasonId}`).classList.add('active')

        getSiblings(event).forEach(node => {
            if(node !== event.target){
                node.classList.remove('active')
            }
            node.style.zIndex = 98
        });

        event.target.style.zIndex = 99

        if(tv){
            document.getElementById('bg-tv').style.backgroundImage = 'url("img/static.gif")'
        }

        document.getElementById('bg-tv').style.backgroundSize = '100% 100%'
        document.getElementById('bg-tv').style.backgroundRepeat = 'no-repeat'
        document.getElementById('episodes-link').style.display = 'none'
        

        setTimeout(() => {
            //Show a random image
            let randomImage = Math.floor((Math.random() * tvThumbs.length))
            document.getElementById('bg-tv').style.backgroundImage = `url(${tvThumbs[randomImage]})`
        }, timeChange+=200)

        setTimeout(() => {
            document.getElementById('bg-tv').style.backgroundImage = 'url("img/static.gif")'
        }, timeChange+=900)

        
        setTimeout(() => {
            //After 1 sec, show episodes
            document.getElementById('bg-tv').style.backgroundImage = ''
            document.getElementById('episodes-link').style.display = 'block'
        }, timeChange+=200)   
    }


    const selectEpisode = (episode) => {
        gsap.to(tvScreen.current, {width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, ease: 'expo' })
        setselectedEpisode(episode)
        setTv(false)
    }

    const selectEpisodeMobile = (episode) => {
        setselectedEpisode(episode)
        setShowMobileEpisode(true)

        window.scrollTo(0, 0)
    }

    const selectSeasonMobile = (e, index) => {

        Object.keys(e.currentTarget.parentNode.children).forEach(nodeIndex => {
            e.currentTarget.parentNode.children[nodeIndex].classList.remove('active')
        })

        e.currentTarget.classList.add('active')

        setSelectedSeason(index)
    }


    return (
        (loading) ?
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="d-flex p-2 bg-white rounded-2 align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"></span>
                </div>
                <span className='mx-2'>Loading...</span>
            </div>
        </div>
        :
        <div className="container-md-fluid">
            <div className='text-center'>
                <h3 className='text-uppercase mt-4 mb-4' style={{color: 'orange', fontWeight: 'bolder'}}>Watch Episodes online</h3>
                {
                    (document.body.clientWidth > 768) &&
                    (seasonEpisodes[seasonEpisodes.length - 1])
                    &&
                    <div className='position-relative container'>
                        <ul className='tab-items d-md-flex'>
                            {seasonEpisodes.map((episode, index) => (
                            <React.Fragment key={index}>
                                <li id={`tab${index}`} className={`tab-item`} onClick={(event) => selectSeason(index, event)} style={{zIndex: 100-index}}>Season {episode.season}</li>
                            </React.Fragment>
                        ))}
                        </ul>
                            <div className='episodes-list d-md-flex justify-content-center' style={{ backgroundImage: 'url("img/rick_and_morty_watch_tv_template.gif")', backgroundRepeat: 'no-repeat' }}>
                                <div className='episode-scroll' id='bg-tv' ref={tvScreen}>
                                    {
                                        (tv) ?
                                        <div id="episodes-link" className='p-4'>
                                        <img src="img/interdimentional_tv_top.png" alt="inter" style={{width: '100%'}}/>
                                        {
                                            seasonEpisodes[selectedSeason].episodes.map((episode, index) => (
                                                <React.Fragment key={index}>
                                                    <div className='px-2 my-3' style={{cursor: 'pointer'}} onClick={() => selectEpisode(episode.episode)}>
                                                        <span className='epNumber'>{episode.episode} - </span> <span className='epName'>{episode.name}</span>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                    :
                                    <div style={{height: '100%', backgroundImage:'url("img/static.gif")', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
                                        <iframe  src={`https://embed.warezcdn.com/serie/tt2861424/${selectedSeason+1}/${selectedEpisode}`} frameBorder="0" allowFullScreen style={{width: '100%', height: '100%'}}></iframe>
                                    </div>
                                    }
                                </div>
                            </div>
                    </div>
                }

                {
                    (document.body.clientWidth <= 768) &&
                    (seasonEpisodes[seasonEpisodes.length - 1])
                    &&
                    <MobileEpisodePlaylist
                    selectedSeason={selectedSeason}
                    selectedEpisode={selectedEpisode}
                    selectSeason={selectSeasonMobile}
                    selectEpisode={selectEpisodeMobile}
                    seasonList={seasonEpisodes}
                    showMobileEpisode={showMobileEpisode}
                    setShowMobileEpisode={setShowMobileEpisode}
                    />
                }
            </div>
        </div>
    )
}
