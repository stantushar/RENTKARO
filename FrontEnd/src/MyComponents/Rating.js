import React, { useEffect, useState } from 'react'
function Rating() {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button
                    className="accordion-button text-dark bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseFive"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFive"
                >
                    Ratings
                </button>
            </h2>
            <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                <div className="accordion-body">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            <i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-warning"></i>
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            <i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i>
                            <i className="fas fa-star text-secondary"></i>
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            <i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-secondary"></i>
                            <i className="fas fa-star text-secondary"></i>
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            <i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-secondary"></i><i className="fas fa-star text-secondary"></i>
                            <i className="fas fa-star text-secondary"></i>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Rating