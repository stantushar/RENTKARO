import React from 'react'
function Footer() {
    return (
        <div id='footer' className="container text-dark pt-3">
            <header className="pt-4 pb-3">
                <h3>Why choose us</h3>
            </header>

            <div className="row mb-4">
                <div className="col-lg-4 col-md-6">
                    <figure className="d-flex align-items-center mb-4">
                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                            <i className="fas fa-camera-retro fa-2x fa-fw text-primary floating"></i>
                        </span>
                        <figcaption className="info">
                            <h6 className="title">Reasonable prices</h6>
                            <p>Discover competitive rental rates that fit your budget.</p>
                        </figcaption>
                    </figure>
                </div>
                <div className="col-lg-4 col-md-6">
                    <figure className="d-flex align-items-center mb-4">
                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                            <i className="fas fa-star fa-2x fa-fw text-primary floating"></i>
                        </span>
                        <figcaption className="info">
                            <h6 className="title">Best quality</h6>
                            <p>Rent high-quality products for your needs.</p>
                        </figcaption>
                    </figure>
                </div>
                <div className="col-lg-4 col-md-6">
                    <figure className="d-flex align-items-center mb-4">
                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                            <i className="fas fa-plane fa-2x fa-fw text-primary floating"></i>
                        </span>
                        <figcaption className="info">
                            <h6 className="title">Worldwide shipping</h6>
                            <p>We offer worldwide shipping for your convenience.</p>
                        </figcaption>
                    </figure>
                </div>
                <div className="col-lg-4 col-md-6">
                    <figure className="d-flex align-items-center mb-4">
                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                            <i className="fas fa-users fa-2x fa-fw text-primary floating"></i>
                        </span>
                        <figcaption className="info">
                            <h6 className="title">Customer satisfaction</h6>
                            <p>Our top priority is your satisfaction with every rental.</p>
                        </figcaption>
                    </figure>
                </div>
                <div className="col-lg-4 col-md-6">
                    <figure className="d-flex align-items-center mb-4">
                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                            <i className="fas fa-thumbs-up fa-2x fa-fw text-primary floating"></i>
                        </span>
                        <figcaption className="info">
                            <h6 className="title">Happy customers</h6>
                            <p>Join our community of satisfied renters.</p>
                        </figcaption>
                    </figure>
                </div>
                <div className="col-lg-4 col-md-6">
                    <figure className="d-flex align-items-center mb-4">
                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                            <i className="fas fa-box fa-2x fa-fw text-primary floating"></i>
                        </span>
                        <figcaption className="info">
                            <h6 className="title">Thousand items</h6>
                            <p>Explore our vast selection of rental items.</p>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}
export default Footer