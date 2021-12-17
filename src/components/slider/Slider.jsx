import React from 'react'
import './slider.css'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'

const Slider = React.forwardRef((props, ref) => {

    const slideButton = side => {
        props.scrollRef(ref)
        console.log(ref.current)
        side === 'left' ? ref.current.scrollLeft -= (slide.current.firstChild.clientWidth * 3) : ref.current.scrollLeft += (slide.current.firstChild.clientWidth * 3)
    }

    const slideWheel = deltaY => {
        
        props.scrollRef(ref)

        if(deltaY > 0){
            ref.current.scrollLeft -= (slide.current.firstChild.clientWidth * 3)
        }else{
            ref.current.scrollLeft += (slide.current.firstChild.clientWidth * 3)
        }
    }

    const slide = React.useRef(null)


    return (
        <div  onWheel={e => slideWheel(e.deltaY)}>

            <div className="slider" ref={ref}>
                <div className='sliderContainer' ref={slide}>
                    {props.children}
                </div>
            </div>
                
            <div className='position-absolute d-flex justify-content-between align-items-center px-4' style={{ width: '100%', height: props.height, top: '45%', zIndex: 120}}>
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
