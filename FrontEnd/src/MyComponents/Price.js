import React, { useEffect, useState } from 'react'
function Price({handleFilter}) {

    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button
                    className="accordion-button text-dark bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                >
                    Price
                </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                <div className="accordion-body">
                    {/* <div className="range">
                        <input type="range" className="form-range" id="customRange1" />
                    </div> */}
                    <div className="row mb-3">
                        <div className="col-6">
                            <p className="mb-0">
                                Min
                            </p>
                            <div className="form-outline">
                                <input type="number" value={minPrice} onChange={(e)=> setMinPrice(e.target.value)} id="typeNumber" className="form-control" />
                                <label className="form-label" htmlFor="typeNumber">₹0</label>
                            </div>
                        </div>
                        <div className="col-6">
                            <p className="mb-0">
                                Max
                            </p>
                            <div className="form-outline">
                                <input type="number" id="typeNumber" value={maxPrice} onChange={(e)=> setMaxPrice(e.target.value)} className="form-control" />
                                <label className="form-label" htmlFor="typeNumber">₹1,0000</label>
                            </div>
                        </div>
                    </div>
                    <button onClick={()=> handleFilter(minPrice,maxPrice)} type="button" className="btn btn-white w-100 border border-secondary">apply</button>
                </div>
            </div>
        </div>
    )
}
export default Price