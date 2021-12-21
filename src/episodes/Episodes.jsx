import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'
import './episodes.css'
import tvThumbs from './tv_thumbs'


export default function Episodes() {

    const location = useLocation()

    const [episodes, setEpisodes] = React.useState({})
    const [seasonEpisodes, setSeasonEpisodes] = React.useState([])

    const [selectedSeason, setSelectedSeason] = React.useState(0)

    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {

        let epList = []

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
        //eslint disable-next-line react-hooks/exhaustive-deps
    },[])

    React.useEffect(() => {
        let result = {};
        if(!loading) {
            for (const ep of episodes.epList){
                let obj_episode = ep.ep

                if(result[ep.season]){
                    result[ep.season].episodes.push(obj_episode)
                    result[ep.season].episodes.sort()
                }else{
                    result[ep.season] = {
                        season: ep.season,
                        episodes: [obj_episode]
                    }
                }
            }
            
            result = Object.values(result);
            setSeasonEpisodes(result)

        }
        //eslint disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const selectSeason = (seasonId) => {

        let timeChange = 0

        document.getElementById('bg-tv').style.backgroundImage = 'url("img/static.gif")'
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
            setSelectedSeason(seasonId)
            document.getElementById('bg-tv').style.backgroundImage = ''
            document.getElementById('episodes-link').style.display = 'block'
        }, timeChange+=200)
        
        
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
        <div className="container">
            <div className='text-center'>
                <h3>Watch Episodes online</h3>
                {
                    (seasonEpisodes[seasonEpisodes.length - 1])
                    &&
                    <>
                        <ul className='tab-items d-flex'>
                            {seasonEpisodes.map((episode, index) => (
                            <React.Fragment key={index}>
                                    <li className={`tab-item ${index === selectSeason ? 'selected' : ''}`} onClick={() => selectSeason(index)} style={{zIndex: 100-index}}>Season {episode.season}</li>
                            </React.Fragment>
                        ))}
                        </ul>
                        
                        

                            <div className='episodes-list d-flex justify-content-center' style={{ backgroundImage: 'url("img/rick_and_morty_watch_tv_template.gif")', backgroundRepeat: 'no-repeat' }}>
                                <div className='episode-scroll' id='bg-tv'>
                                    <div id="episodes-link" className='p-4'>
                                        {
                                            seasonEpisodes[selectedSeason].episodes.map((episode, index) => (
                                                <React.Fragment key={index}>
                                                    <p className='px-2' style={{cursor: 'pointer'}}>
                                                        {episode.episode} - {episode.name}
                                                    </p>
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                    </>
                }
            </div>
        </div>
    )
}
