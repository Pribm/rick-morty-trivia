import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Episodes() {

    const location = useLocation()

    const [episodes, setEpisodes] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {

        let epList = []

        location.state.forEach(episode => {
            axios.get(episode).then(res => {

                epList.push(
                    {
                        name: res.data.name,
                        ep: {
                            season: res.data.episode.replace(/E(.*)/,'').replace('S', ''),
                            episode: res.data.episode.replace(/^(.*?)E/, '')
                        }
                    }
                )

                setEpisodes({epList})

                setLoading(false)
            })
        });
    },[])

    return (
        (!loading) &&
        <div>
            Episodios
            {episodes.epList.map((ep, index) => (
                <div key={index}>
                    <h1>{ep.name}</h1>
                    <h4>Season {ep.ep.season}</h4>
                    <h4>Episode {ep.ep.episode}</h4>
                    <iframe src={`https://embed.warezcdn.com/serie/tt2861424/${ep.ep.season}/${ep.ep.episode}`} frameborder="0"></iframe>
                </div>
            ))}
            
        </div>
    )
}
