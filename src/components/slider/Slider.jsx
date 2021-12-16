import React from 'react'
import './slider.css'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'

const Slider = React.forwardRef((props, ref) => {

    const slideButton = side => {
        props.scrollRef(ref)
        side === 'left' ? ref.current.scrollLeft -= (ref.current.firstChild.clientWidth * 3) : ref.current.scrollLeft += (ref.current.firstChild.clientWidth * 3)
    }

    const slide = React.useRef(null)


    return (
        <div ref={slide} className='pt-4' className='position-relative'>
            <div style={{position: 'relative', overflow: 'hidden'}}>
                
                <div style={{position: 'relative', top:'18px'}} className="slider" ref={ref}>
                    {props.children}
                </div>
                
            </div>

            <div className='position-absolute d-flex justify-content-between align-items-center px-4' style={{ width: '100%', height: props.height, top: '45%'}}>
                <p className='slider-arrow'
                    onClick={() => {slideButton('left')}}
                > <MdArrowLeft size='2rem' color='#03d3fc' /> </p>
                <p className='slider-arrow'> <MdArrowRight size='2rem' color='#03d3fc'
                    onClick={() => {slideButton('right') }}
                /> </p>
            </div>
        </div>
    )
})

export default Slider
