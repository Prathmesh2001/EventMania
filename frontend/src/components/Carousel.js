import React from 'react'

function Carousel() {
    return (
        <div>
            <div className="carousel-container">
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://source.unsplash.com/1600x900/?concert" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/1400x900/?sport" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/1200x700/?entertainment" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Carousel
