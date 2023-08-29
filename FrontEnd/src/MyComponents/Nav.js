import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
function Nav(props) {
    let count = props.len
    const itemsToRender = []
    let navigate = useNavigate()
    
    for (let i = 0; i <= count; i++) {
        itemsToRender.push(<li className="page-item"><a href="" className="page-link" onClick={(e)=>{ e.preventDefault(); navigate("/category?category=" + props.cat + "&num=" + i)}}>{i + 1}</a></li>);
    }

    return (
        <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="" aria-label="Previous" onClick={(e)=>{ e.preventDefault(); if(props.num>0) { navigate("/category?category=" + props.cat + "&num="+(parseInt(props.num)-1)) } }}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {itemsToRender}
                < li className="page-item" >
                    <a className="page-link" href="" aria-label="Next" onClick={(e)=>{ e.preventDefault(); if(props.num<count) { navigate("/category?category=" + props.cat + "&num="+(parseInt(props.num)+1)) } }}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
export default Nav