import React, { useEffect, useState } from 'react'
import HomeHeader from './HomeHeader'
import ShowFilter from './ShowFilter'
import Footer from './Footer'
import axios from "axios"
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import NavLink from './NavLink'
import AccountOption from './AccOption'
import AccDetails from './AccDetails'
import ChangePass from './ChangePass'
import Product from './Product'
import Nav from './Nav'

function Profile() {
    let navigate = useNavigate()
    const location = useLocation();
    const [products, setProducts] = useState([])
    const [productsLst, setProductsLst] = useState([])
    useEffect(() => {
        getProducts()
    }, [location.pathname])
    const queryParameters = new URLSearchParams(window.location.search)
    const num = queryParameters.get("num")
    const path = window.location.pathname
    const getProducts = async () => {
        if (path == "/myproducts" || path == "/orderhistory") {
            await axios.get("http://localhost:8080/profile" + path, { withCredentials: true }).then((resp) => {
                setProducts(resp.data)
                setProductsLst(resp.data)
            }).catch((err) => {
                navigate("/")
            })
        }
        else if (path == "/profile") {
            await axios.get("http://localhost:8080/profile/rentedproduct", { withCredentials: true }).then((resp) => {
                setProducts(resp.data)
            }).catch((err) => {
                navigate("/")
            })
        }
    }
    const search = (str) => {
        if (str !== "") {
            let searchProd = [...productsLst]
            const searchByName = searchProd.filter((obj) => obj.productName.toLowerCase().includes(str))
            searchProd = [...productsLst].filter(obj1 => !searchByName.some(obj2 => obj1.productId == obj2.productId))
            const searchByDesc = searchProd.filter((obj) => obj.productDescription.toLowerCase().includes(str))
            searchProd = [...productsLst].filter(obj1 => !searchByDesc.some(obj2 => obj1.productId == obj2.productId))
            const searchByFeature = searchProd.filter((obj) => obj.productFeatures.toLowerCase().includes(str))
            searchProd = [...productsLst].filter(obj1 => !searchByFeature.some(obj2 => obj1.productId == obj2.productId))
            if (path != "/orderhistory") {
                searchProd = [...productsLst].filter(obj1 => !searchByFeature.some(obj2 => obj1.productId == obj2.productId))
                const searchByCategory = searchProd.filter((obj) => obj.category.toLowerCase().includes(str))
                setProducts([...searchByName, ...searchByDesc, ...searchByFeature, ...searchByCategory])
            }
            else setProducts([...searchByName, ...searchByDesc, ...searchByFeature])
        }
    }
    return (
        <>
            <HomeHeader search={search} />

            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ShowFilter />
                            <AccountOption />
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-8">
                            {(() => {
                                if (window.location.pathname == "/profile") {
                                    return (
                                        <>
                                            <AccDetails />
                                            <div className='mt-5' />
                                            <Product prod={products} num={0} path={path} />
                                        </>
                                    )
                                } else if (window.location.pathname == "/changepass") {
                                    return <ChangePass />;
                                }
                                else if (window.location.pathname == "/myproducts" || window.location.pathname == "/orderhistory") {
                                    return (
                                        <>
                                            <Product prod={products} num={num} />
                                            <NavLink len={products.length / 5} num={num} path={path} />
                                        </>)
                                }
                                // else if (window.location.pathname == "/rentedproducts") {
                                //     return (
                                //         <>
                                //             <Product prod={products} num={num} />
                                //             <NavLink len={products.length / 5} num={num} path={path}/>
                                //         </>)
                                // }
                            })()}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Profile