
import Carousel from "react-multi-carousel";
import "./slider.scss";
import React, { useEffect, useState } from 'react'


const SliderImg = (props) => {
    const {children, show} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    const [touchPosition, setTouchPosition] = useState(null)

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => { 
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null) 
    }

    return (
        <div className="carousel-container homepage_slider_carousel noPadding">
            <div className="carousel-wrapper carousel-wrapperS">
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex >= 0 &&
                    <button onClick={prev} className="left-arrow left-arrow2">
                        <img src="/Images/leftArr2.svg" />
                    </button>
                }
                <div
                    className="carousel-content-wrapper carousel-content-wrapperS"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    {show===3 ?
                    <div
                        className={`homepage_slider_sec`}
                        style={{ transform: `translateX(-${currentIndex * ((106.3 +currentIndex*0.7) / show)}%)` }}
                    >
                        {children}
                    </div>
                    :
                    <div
                        className={`carousel-content show-${show}`}
                        className="carousel-content show-3"
                        style={{ transform: `translateX(-${currentIndex * ((100) / 0.886)}%)` }}
                    >
                        {children}
                    </div>
                    }
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex <= (length - show) &&
                    <button onClick={next} className="right-arrow right-arrow2">
                        <img src="/Images/RightArr2.svg"/>
                    </button>
                }
            </div>
        </div>
    )
}

export default SliderImg;