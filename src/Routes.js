import React from 'react'
import {Route, Routes as ReactRoutes, BrowserRouter} from 'react-router-dom'
import Episodes from './episodes/Episodes'
import Index from './index/Index'

export default function Routes() {
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route path='*' element={<Index/>}/>
                <Route exact path='/' element={<Index/>}/>
                <Route exact path='/episodes' element={<Episodes/>}/>
            </ReactRoutes>
        </BrowserRouter>
    )
}
