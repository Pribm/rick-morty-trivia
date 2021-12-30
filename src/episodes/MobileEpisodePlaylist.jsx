import React from 'react'
import { MdArrowBack, MdPlayCircleOutline } from 'react-icons/md'

export default function MobileEpisodePlaylist(props) {
    return (
        <>
            <div className="player_top">
                {(props.showMobileEpisode === true) ?
                <>
                    <div style={{height: '100%', backgroundImage:'url("img/static.gif")', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
                        <iframe  src={`https://embed.warezcdn.com/serie/tt2861424/${props.selectedSeason+1}/${props.selectedEpisode}`} frameBorder="0" allowFullScreen className='player_image'></iframe>
                    </div>
                    <MdArrowBack style={{color: 'white', top: '10px', position: 'absolute', left: '10px'}} onClick={() => props.setShowMobileEpisode(false)}/>
                </>
                :
                <img src="img/player_image.png" alt="player_image" className='player_image' />
                }
                {
                    !props.showMobileEpisode &&
                    <div className="session_selector">
                    <h5 className='my-0'>Session {props.seasonList[props.selectedSeason].season}</h5>
                    <div className='session_numbers mt-0 d-flex justify-content-center'>
                        {props.seasonList.map((season, index) => {
                            return (
                                <div key={index} className="d-flex flex-column align-items-center pb-2 selected_season_mobile" onClick={e => props.selectSeason(e, index)}>
                                    <span className='mx-2'>{season.season}</span>
                                    <div className='dot_selection'></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                }
            </div>
        
            <div className='episodes_section'>
                {(props.seasonList.length !== 0) &&
                    props.seasonList[props.selectedSeason].episodes.map((episode, index) => {
                        return (
                            <div key={index} className="episode_selector">
                                <div className="col-4">
                                    <img src="img/player_thumb.png" alt="player_thumb" className='player_thumb' />
                                </div>
                                <div className="col-6 py-2 text-start episode_text">
                                    <h6>Episode {episode.episode}</h6>
                                    <p>{episode.name}</p>
                                </div>

                                <div className='col-2 text-start'>
                                    <MdPlayCircleOutline className='play_icon' size={40} onClick={() => props.selectEpisode(episode.episode)}/>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </>

    )
}