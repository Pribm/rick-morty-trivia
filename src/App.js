import {React} from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/header/Header'
import Routes from './Routes'

const App = () => (
    <BrowserRouter>
      <Header/>
      <Routes/>
    </BrowserRouter>
)

export default App