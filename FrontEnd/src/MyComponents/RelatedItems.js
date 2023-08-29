import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
function RelatedItems() {
    let navigate = useNavigate()
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button
                    className="accordion-button text-dark bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                >
                    Related items
                </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                <div className="accordion-body">
                    <ul className="list-unstyled">
                        <li><a href="" onClick={(e)=>{ e.preventDefault(); navigate("/category?category=furnitures&num=0")}} className="text-dark">Furnitures </a></li>
                        <li><a href="" onClick={(e)=>{ e.preventDefault(); navigate("/category?category=vehicles&num=0")}} className="text-dark">Vehicles</a></li>
                        <li><a href="" onClick={(e)=>{ e.preventDefault(); navigate("/category?category=electronics&num=0")}} className="text-dark">Electronics</a></li>
                        <li><a href="" onClick={(e)=>{ e.preventDefault(); navigate("/category?category=clothes&num=0")}} className="text-dark">Clothes</a></li>
                        <li><a href="" onClick={(e)=>{ e.preventDefault(); navigate("/category?category=others&num=0")}} className="text-dark">Others</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default RelatedItems