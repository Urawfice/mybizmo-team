
import Carousel from "react-multi-carousel";
// import "./styleS.css";
import React, { useEffect, useState } from 'react'


const SliderOne = (props) => {
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
        <div className="carousel-containerS1">
            <div className="carousel-wrapperS1">
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex >= 0 &&
                    <button onClick={prev} className="left-arrow left-arrow3 slider-one-left">
                        <img src="/Images/leftArr2.svg"  className="lgtAr"  />
                    </button>
                }
                <div
                    className="carousel-content-wrapperS1"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`}
                        style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                    >
                        {children}
                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex <= (length - show) &&
                    <button onClick={next} className="right-arrow right-arrow3 ">
                        <img src="/Images/RightArr2.svg" className="rgtAr" />
                    </button>
                }
            </div>
        </div>
    )
}

export default SliderOne;