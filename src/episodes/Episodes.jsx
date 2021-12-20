import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'
import './episodes.css'


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
                        season: res.data.episode.replace(/E(.*)/,'').replace('S', ''),
                        ep: {
                            name: res.data.name,
                            episode: res.data.episode.replace(/^(.*?)E/, '')
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

    const selectSeason = seasonId => {
        setSelectedSeason(seasonId)
    }

    return (
        (loading) ?
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-danger">
            <div className="d-flex p-2 bg-white rounded-2 align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"></span>
                </div>
                <span className='mx-2'>Loading...</span>
            </div>
        </div>
        :
        <div className="container">
            <div className="bg-success">
                {
                    (seasonEpisodes.length !== 0)
                    &&
                    <>
                        {seasonEpisodes.map((episode, index) => (
                        <React.Fragment key={index}>
                            <ul className='tab-items'>
                                <li className='tab-item' onClick={() => selectSeason(index)}>Season {episode.season}</li>
                            </ul>
                        </React.Fragment>
                    ))}

                    <div className='episodes-list'>
                        {
                            seasonEpisodes[selectedSeason].episodes.map((episode, index) => (
                                <React.Fragment key={index}>
                                    <p>
                                    {episode.name}
                                    </p>
                                </React.Fragment>
                            ))
                        }
                    </div>
                    </>
                }
            </div>
        </div>
    )
}
