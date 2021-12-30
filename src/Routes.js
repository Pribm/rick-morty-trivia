import React from 'react'
import { Routes as ReactRoutes ,Route} from 'react-router-dom'
import Episodes from './episodes/Episodes'
import Index from './index/Index'

export default function Routes() {
    return (
        <ReactRoutes>
            <Route path='*' element={<Index/>}/>
            <Route path='/'>
                <Route path='' element={<Index/>}/>
                <Route path='episodes' element={<Episodes/>}/>
            </Route>
        </ReactRoutes>
    )
}
