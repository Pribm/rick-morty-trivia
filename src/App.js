import {React} from 'react'
import Header from './components/header/Header'
import Routes from './Routes'
import './global.css'
import { HashRouter } from 'react-router-dom'
import Footer from './components/footer/Footer'

const App = () => (
      <HashRouter>
        <Header/>
        <Routes/>
        <Footer/>
      </HashRouter>

)

export default App