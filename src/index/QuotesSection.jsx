import React from 'react'
import { quotes } from '../components/quotes'

export default function QuotesSection({ }) {

    const [quote, setQuote] = React.useState(quotes[Math.floor(Math.random() * ((quotes.length - 1) - 0 + 1) + 0)])

    return (



        <div className="container-fluid" style={{background: 'linear-gradient(-40deg, rgba(106,233,255,1) 13%, rgba(49,192,246,1) 45%)', overflow: 'hidden'}}>

            <div className="row align-items-center px-5">
                <div className="col-md-8 py-4">
                    <h1 className='display-5 daily-quote text-start' style={{textAlign: 'justify'}}>{quote.replace(/-([\s\S]*)$/, '')}</h1>
                    <p className='quote-name ms-auto text-start'>{quote.replace(/.+?(?= - )/, '').replace('-', '')}</p>
                </div>

                <div className="col-md-4 text-center position-relative">
                    <img src="img/picke_rick.png" alt="picke_rick" />
                    <button
                    onClick={() => setQuote(quotes[Math.floor(Math.random() * ((quotes.length - 1) - 0 + 1) + 0)])}
                    className='btn btn-primary'
                    style={{position: 'absolute', bottom: '10%', left: '10%'}}>
                        Change Quote
                    </button>
                </div>
            </div>
            
        </div>
    )
}
