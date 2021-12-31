import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './header.css'

const linkComponent = props => {

        return (
        <span>
            {props.children}
        </span>)
}

export default function Header() {

    return (
        <div className='d-md-flex text-center ' id='top'>
            <div className='mt-4 mb-0 ps-4 '>
                <img src="img/logo.png" alt="logo" height='100' />
            </div>
            <div className='d-flex justify-content-center align-items-center mt-0 ms-auto me-4 navbar-custom'>
                <div>
                    <Link to='/' className='mt-auto mb-auto mx-2 link'>Characters</Link>
                    <Link to='/episodes' className='mt-auto mb-auto mx-2 link'>Episodes</Link>
                </div>
            </div>
        </div>
    )
}
