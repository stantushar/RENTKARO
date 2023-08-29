import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
function Product(props) {
    let navigate = useNavigate()
    async function rentProd(prodid) {
        // const queryParameters = new URLSearchParams(window.location.search)
        // const prodid = queryParameters.get("prodid")
        const flag = window.confirm("Are you sure want to Rent product? Remember you can only rent one product at a time.")
        if (flag) {
            await axios.get("http://localhost:8080/product/rent/" + prodid, { withCredentials: true }).then((resp) => {
                alert("product rented successfully")
                navigate("/profile")
            }).catch((err) => {
                alert("Sorry but you cant rent multiple products")
                navigate("/home")
            })
        }
        else {
            navigate("/home")
        }
    }
    function addToWishList(prodid) {

    }
    
    async function deleteProd (prodid) {
        const flag = window.confirm("Are you sure want to Delete product?")
        if (flag) {
            await axios.delete("http://localhost:8080/profile/myproduct/" + prodid, { withCredentials: true }).then((resp) => {
                alert(resp.data)
                navigate("/profile")
            }).catch((err) => {
                navigate("/myproducts?num=0")
            })
        }
        else{
            navigate("/myproducts?num=0")
        }
    }
    return (
        props.prod.filter((prod, ind) => {
            return (ind >= props.num * 5 && ind < props.num * 5 + 5)
        }).map((product, index) => (
            
            <div className="row justify-content-center mb-3">
                <div className="col-md-12">
                    <div className="card shadow-0 border rounded-3">
                        <div className="card-body">
                            <div className="row g-0">
                                <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                                    <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0 ">
                                        <img src={`data:image/png;base64,${product.prodImg1}`} className="w-100 h-100" />
                                        
                                        {(() => {
                                            if (window.location.pathname == "/myproducts") {
                                                return (
                                                <a href="" onClick={(e) => { e.preventDefault(); navigate("/product?prodid=" + product.productId+"&id="+(5*props.num+index)) }}>
                                                    <div className="hover-overlay">
                                                        <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15);" }}></div>
                                                    </div>
                                                </a>)
                                            }
                                            else{
                                                return (
                                                    <a href="" onClick={(e) => { e.preventDefault(); navigate("/product?prodid=" + product.productId) }}>
                                                        <div className="hover-overlay">
                                                            <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15);" }}></div>
                                                        </div>
                                                    </a>)
                                            }
                                        })()}
                                    </div>
                                </div>
                                <div className="col-xl-6 col-md-5 col-sm-7 ">
                                    <h5 className='w-100'>{product.productName}</h5>
                                    <div className="d-flex flex-row">
                                        <div className="text-warning mb-1 me-2">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fas fa-star-half-alt"></i>
                                            <span className="ms-1">
                                                4.5
                                            </span>
                                        </div>
                                        {/* <span className="text-muted">154 orders</span> */}
                                    </div>

                                    <p className="text mb-4 mb-md-0 w-100">
                                        Desc : {product.productDescription}
                                        <br /> Feature : {product.productFeatures}
                                    </p>
                                </div>
                                <div className="col-xl-3 col-md-3 col-sm-5 p-2">
                                    <div className="d-flex flex-row align-items-center mb-1">
                                        <h4 className="mb-1 me-1">₹{product.rentalPrice}</h4>
                                        <span className="text-danger">₹{product.deposite}</span>
                                    </div>

                                    {(() => {
                                        if (window.location.pathname == "/myproducts") {
                                            return (
                                                <div className="mt-4">
                                                    <a href="" onClick={(e) => { e.preventDefault(); navigate("/updateprod?prodid=" + (5*props.num+index)) }} className="btn btn-primary shadow-0 m-1" type="button">Edit</a>
                                                    <a href="" onClick={(e) => { e.preventDefault(); deleteProd(5*props.num+index) }} className="btn btn-danger shadow-0 m-1" type="button">Delete</a>
                                                </div>
                                            )
                                        } else if (window.location.pathname == "/profile") {
                                            return (
                                                <div className="mt-4">
                                                    <a href={"/product/rent/" + product.productId} className="btn btn-danger shadow-0 m-1" type="button">Return</a>
                                                    {/* <a href={"/product/wishlist/" + product.productId} className="btn btn-danger shadow-0 m-1" type="button">Delete</a> */}
                                                </div>
                                            )
                                        }
                                        else if (window.location.pathname == "/orderhistory") {
                                            return (
                                                <div className="d-flex flex-row align-items-center mb-1 mt-4">
                                                    <h4 className="text-success">{product.rentalDate}</h4><br />
                                                    <h4 className="text-danger">{product.returnDate}</h4><br />
                                                    <h4 className="text-primary">{product.transactionId}</h4>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="mt-4">
                                                    <a href="" onClick={(e) => { e.preventDefault(); rentProd(product.productId) }} className="btn btn-primary shadow-0 m-1" type="button">Rent</a>
                                                    <a href="" onClick={(e) => { e.preventDefault(); addToWishList(product.productId) }} className="btn btn-light border px-2 pt-2 icon-hover m-1"><i className="fas fa-heart fa-lg px-1"></i></a>
                                                </div>
                                            )
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}
export default Product