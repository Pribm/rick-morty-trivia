import {React} from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/header/Header'
import Routes from './Routes'
import './global.css'
import Loader from './components/loader/Loader'
import Footer from './components/footer/Footer'

const App = () => (
    <BrowserRouter>
      <Header/>
      <Routes/>
      <Footer/>
    </BrowserRouter>
)

export default App