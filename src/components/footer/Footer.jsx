import React from 'react'
import { MdArrowDropUp } from 'react-icons/md'
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import './footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <a className=" text-center text-decoration-none align-self-top" href='#top'>
                        <MdArrowDropUp/>
                        <h6>Go to top</h6>
                        <img src="img/meeseks.jpg" alt="meeseks" style={{width: '80px', borderRadius: '40px'}}/>
                    </a>

                    <div className="d-flex pt-5 justify-content-center">
                        
                        <div>
                            <a href="https://www.instagram.com/rickandmorty/" target={'blank'} className='px-2'><AiOutlineInstagram size={30}/></a>
                            <a href="https://facebook.com/RickandMorty/" target={'blank'} className='px-2'><AiOutlineFacebook size={30}/></a>
                            <a href="https://twitter.com/rickandmorty" target={'blank'} className='px-2'><AiOutlineTwitter size={30}/></a>
                        </div>
                    </div>

                    <div className="pt-5">
                        <img src="img/logo.png" alt="logo_bottom" height='50px'/>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row mt-3 text-center text-white pt-4" style={{backgroundColor: 'rgb(113, 204, 226)'}}>
                        <p>This is a non-profit app developed by a fan. Enjoy a lot!</p>
                </div>
            </div>
        </div>
    )
}
