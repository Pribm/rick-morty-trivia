import React from 'react'

export default function Header() {
    return (
        <div className='d-flex'>
            <div className='m-4'>
                <img src="img/logo.png" alt="logo" height='100'/>
            </div>

            <div className='d-flex align-items-center ms-auto me-4'>
                <p className='bg-success mt-auto mb-auto mx-2'>Characters</p>
                <p className='bg-success mt-auto mb-auto mx-2'>Locations</p>
                <p className='bg-success mt-auto mb-auto mx-2'>Episodes</p>
                <p className='bg-success mt-auto mb-auto mx-2'>Link3</p>
            </div>
        </div>
    )
}
