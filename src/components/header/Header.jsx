import React from 'react'

export default function Header() {
    return (
        <div className='d-md-flex'>
            <div className='mt-4 mb-0 ps-4'>
                <img src="img/logo.png" alt="logo" height='100'/>
            </div>

            <div className='d-md-flex align-items-center mt-0 text-end ms-auto me-4 navbar-custom'>
                <p className='mt-auto mb-auto mx-2'>Characters</p>
                <p className='mt-auto mb-auto mx-2'>Locations</p>
                <p className='mt-auto mb-auto mx-2'>Episodes</p>
                <p className='mt-auto mb-auto mx-2'>Link3</p>
            </div>
        </div>
    )
}
