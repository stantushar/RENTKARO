import React, { useEffect, useState } from 'react'
import HomeHeader from './HomeHeader'
import ShowFilter from './ShowFilter'
import RelatedItems from './RelatedItems'
import Price from './Price'
import Rating from './Rating'
import Sort from './Sort'
import Product from './Product'
import Nav from './Nav'
import Footer from './Footer'
import axios from "axios"
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom"

function Categories() {
    let navigate = useNavigate()
    const location = useLocation();
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, [location.search])
    const queryParameters = new URLSearchParams(window.location.search)
    const category = queryParameters.get("category")
    const num = queryParameters.get("num")
    const getProducts = async () => {
        await axios.get("http://localhost:8080/home/"+category, { withCredentials: true }).then((resp) => {
            setProducts(resp.data)
        }).catch((err) => {
            navigate("/")
        })
    }

    const handleFilter = (min, max)=>{
        min=parseInt(min)
        max=parseInt(max)
        setProducts(()=>{
            return products.filter(p=>p.rentalPrice>=min && p.rentalPrice<=max)
        })
        console.log("products")
    }

    return (
        <>
            <HomeHeader />

            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ShowFilter />
                            <div className="collapse card d-lg-block mb-5" id="navbarSupportedContent">
                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    <RelatedItems />
                                    <Price handleFilter={handleFilter} />
                                    <Rating/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-8">
                            <Sort cat={category} len={products.length}/>
                            <Product prod={products} num={num}/>
                            <hr />

                            <Nav len={parseInt(products.length / 5)}  cat={category} num={num}/>
                        </div>
                    </div>
                </div>
            </section>
           <Footer/>
        </>
    )
}

export default Categories