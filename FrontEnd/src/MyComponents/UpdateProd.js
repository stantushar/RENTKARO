import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import Notch from './Notch';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"

export default function UpdateProd() {
    const [productName, setProdName] = useState('')
    const [productFeatures, setProdFeature] = useState('')
    const [productDescription, setProdDesc] = useState('')
    const [rentalPrice, setRent] = useState('')
    const [deposite, setDeposite] = useState('')
    const [category, setCategory] = useState('Furnitures')
    // const [product, setProduct] = useState('')
    let navigate = useNavigate()
    useEffect(() => {
        loadProducts()
    }, [])
    const queryParameters = new URLSearchParams(window.location.search)
    let prodid = queryParameters.get("prodid")
    const loadProducts = async () => {
        await axios.get("http://localhost:8080/product/myproduct/" + prodid, { withCredentials: true }).then((resp) => {
            // setProduct(resp.data)
            setProdName(resp.data.productName)
            setProdFeature(resp.data.productFeatures)
            setProdDesc(resp.data.productDescription)
            setRent(resp.data.rentalPrice)
            setDeposite(resp.data.deposite)
            setCategory(resp.data.category)
        }).catch((err) => {
            navigate("/")
        })
    }
    function updateProd(e){
        e.preventDefault()
        const product = {productName,productFeatures,productDescription,rentalPrice,deposite,category}
        console.log(product)
        axios.put("http://localhost:8080/profile/myproduct/" + prodid, product, { withCredentials: true }).then((resp) => {
            navigate("/myproducts?num=0")
        }).catch((err) => {
            alert(err.data)
        })
    }
    return (
        <>
            <HomeHeader />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <h3>Update Product</h3><hr />
                    <form onSubmit={updateProd}>
                        <div className="form-outline mb-4">
                            <input type="text" id="form6Example5" className="form-control active" required value={productName} onChange={(e) => setProdName(e.target.value)} />
                            <label className="form-label" htmlFor="form6Example5">Product Name </label>
                            <Notch/>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="form6Example3" className="form-control active" value={productFeatures} required onChange={(e) => setProdFeature(e.target.value)} />
                            <label className="form-label" htmlFor="form6Example3">Product Feature</label>
                            <Notch/>
                        </div>

                        <div className="form-outline mb-4">
                            <textarea className="form-control active" id="form6Example7" rows="4" value={productDescription} required onChange={(e) => setProdDesc(e.target.value)} ></textarea>
                            <label className="form-label" htmlFor="form6Example7">Product Description</label>
                            <Notch/>
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <input type="number" id="form6Example1" className="form-control active" required value={rentalPrice} onChange={(e) => setRent(e.target.value)} />
                                    <label className="form-label" htmlFor="form6Example1">Rental Price</label>
                                    <Notch/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <input type="number" id="form6Example1" className="form-control active" required value={deposite} onChange={(e) => setDeposite(e.target.value)} />
                                    <label className="form-label" htmlFor="form6Example1">deposite</label>
                                    <Notch/>
                                </div>
                            </div>
                        </div>

                        <select className="form-select mb-4 form-outline" aria-label="Default select example" required value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option selected value="Furnitures">Furnitures</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="clothes">Clothes</option>
                            <option value="Others">Others</option>
                        </select>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Update Product</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}