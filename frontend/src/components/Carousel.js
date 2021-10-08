import React from 'react'

function Carousel() {
    return (
        <div>
            <div className="carousel-container">
                <div id="eve" className="carousel slide" data-bs-ride="carousel">
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
                            <button type="button" data-bs-target="#eve" data-bs-slide-to="0" className="active"></button>
                            <button type="button" data-bs-target="#eve" data-bs-slide-to="1" ></button>
                            <button type="button" data-bs-target="#eve" data-bs-slide-to="2" ></button>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#eve" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#eve" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Carousel
