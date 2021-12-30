import React from 'react'
import './loader.css'
import { Modal } from 'react-bootstrap'

export default function Loader() {

    return (
        <Modal show='true' className='d-flex align-items-center justify-content-center'>
            <div className="bg-white px-3 rounded-3 py-2 d-flex flex-column align-items-center">
                
                <div className="image position-relative">
                    <img src="img/loading.gif" alt="loading" width='100px'/>
                </div>
                <img src="img/loading-word.gif" height='30px' alt="loading..." />
            </div>
        </Modal>
    )
}
