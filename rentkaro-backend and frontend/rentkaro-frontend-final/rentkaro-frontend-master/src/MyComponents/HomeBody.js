import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
import clothesbaner from "../static_images/clothes-baner.jpg"
function HomeBody(props) {
    let products = props.prod
    let navigate = useNavigate()

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js")
    })

    function paymentAPI(product) {
        const ammount = parseInt(product.rentalPrice) + parseInt(product.deposite)
        axios.get("http://localhost:8080/product/makepayment/" + ammount).then((resp) => {
            const orderId = resp.data
            let options = {
                "key": "rzp_test_YEzPPX99Po9GMr", // Enter the Key ID generated from the Dashboard
                "amount": ammount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "RentKaro", //your business name
                "description": "Test Transaction",
                // "image": "https://example.com/your_logo",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: function (resp) {
                    axios.get(`http://localhost:8080/product/rent/${product.productId}/${orderId}`, { withCredentials: true }).then((resp) => {
                        alert("product rented successfully")
                        navigate("/profile")
                    }).catch((err) => {
                        alert(err)
                        navigate("/home")
                    })
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            let rzp1 = new window.Razorpay(options);
            rzp1.open();
        }).catch((err) => {
            alert(err)
        })

    }
    async function rentProd(product) {
        // const queryParameters = new URLSearchParams(window.location.search)
        // const prodid = queryParameters.get("prodid")
        const flag = window.confirm("Are you sure want to Rent product? Remember you can only rent one product at a time.")
        if (flag) {
            paymentAPI(product)
        }
        else {
            navigate("/home")
        }
    }
    function addToWishList (prodid) {

    }
    return (
        <>
            <div className="text-white py-5"
            style={{
                backgroundImage: `url(${clothesbaner})`, // Replace with your image path
                backgroundSize: 'cover',}}
            >
                <div className="container py-5">
                    <h1>
                        Best products & <br />
                        brands in our store
                    </h1>
                    <p>
                        Trendy Products, Factory Prices, Excellent Service
                    </p>
                    <a href='#footer'>
                    <button type="button" className="btn btn-outline-light" style={{ marginRight: "10px" }}>
                        Learn more
                    </button>
                    </a>
                    <a href='#new_products'>
                    <button type="button" className="btn btn-light shadow-0 text-primary pt-2 border border-white">
                        <span className="pt-1">Purchase now</span>
                    </button>
                    </a>
                </div>
            </div>
            <div id='new_products' className="container my-5">
                <header className="mb-4">
                    <h3>New products</h3>
                </header>

                <div className="row">
                    {
                        products.map((product, index) => (

                            <div className="col-lg-3 col-md-6 col-sm-6 d-flex mb-4">
                                <div className="card w-100 h-100 my-2 shadow-2-strong m-2">
                                    {/* <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" className="card-img-top" style={{ aspectRatio: "1 / 1" }} /> */}
                                    {/* <div className="col-xl-3 col-md-4 d-flex justify-content-center"> */}
                                        <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0 w-100">
                                            <img src={`data:image/png;base64,${product.prodImg1}`} className="card-img-top" style={{ aspectRatio: "1 / 1" }} />
                                            <a href="" onClick = {(e)=>{ e.preventDefault(); navigate("/product?prodid="+product.productId)}}>
                                                <div className="hover-overlay">
                                                    <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15);" }}></div>
                                                </div>
                                            </a>
                                        </div>
                                    {/* </div> */}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.productName}</h5>
                                        <p className="card-text">₹{product.rentalPrice}</p>
                                        <p className="card-text">₹{product.deposite}</p>
                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="" onClick = {(e)=>{ e.preventDefault(); rentProd(product)}} className="btn btn-primary shadow-0 me-1">Rent</a>
                                            <a href="" onClick = {(e)=>{ e.preventDefault(); addToWishList(product.productId)}} ><i className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {/* <div className="col">
                        <div className="card w-100 my-2 shadow-2-strong">
                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp" className="card-img-top" style={{ aspectRatio: "1 / 1" }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Canon camera 20x zoom, Black color EOS 2000</h5>
                                <p className="card-text">$320.00</p>
                                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                    <a href="#!" className="btn btn-primary shadow-0 me-1">Buy</a>
                                    <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card w-100 my-2 shadow-2-strong">
                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp" className="card-img-top" style={{ aspectRatio: "1 / 1" }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Xiaomi Redmi 8 Original Global Version 4GB</h5>
                                <p className="card-text">$120.00</p>
                                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                    <a href="#!" className="btn btn-primary shadow-0 me-1">Buy</a>
                                    <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card w-100 my-2 shadow-2-strong">
                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.webp" className="card-img-top" style={{ aspectRatio: "1 / 1" }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Apple iPhone 12 Pro 6.1" RAM 6GB 512GB Unlocked</h5>
                                <p className="card-text">$120.00</p>
                                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                    <a href="#!" className="btn btn-primary shadow-0 me-1">Buy</a>
                                    <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>
        </>
    )
}
export default HomeBody