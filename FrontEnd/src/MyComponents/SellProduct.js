import React, { useEffect, useState } from 'react'
import Notch from './Notch';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from 'axios';
import HomeHeader from './HomeHeader';
import Footer from './Footer';

export default function SellProduct() {
    const [productName, setProdName] = useState('')
    const [productFeatures, setProdFeature] = useState('')
    const [productDescription, setProdDesc] = useState('')
    const [rentalPrice, setRent] = useState('')
    const [deposite, setDeposite] = useState('')
    const [category, setCategory] = useState('Furnitures')
    const [prodImg1, setProdImg1] = useState('')
    const [prodImg2, setProdImg2] = useState('')
    let navigate = useNavigate()
    useEffect(() => {
        isLogin()
    }, [])
    async function isLogin() {
        await axios.get("http://localhost:8080/user/islogin", { withCredentials: true }).then((resp) => {
            if (resp.data == "") navigate("/")
        }).catch((err) => {
            navigate("/")
        })
    }
    function sellProd(e) {
        e.preventDefault()
        const product = { productName, productFeatures, productDescription, rentalPrice, deposite, category }
        axios.post("http://localhost:8080/product/sell", product, { withCredentials: true }).then((resp) => {
            const prodid = parseInt(resp.data)
            const formData = new FormData();
            formData.append('image1', prodImg1);
            formData.append('image2', prodImg2);

            axios.post("http://localhost:8080/product/prodimage?prodid=" + prodid, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const flag = window.confirm("Product Sold Successfully... Do you want to go MyProduct page")
            if (flag) navigate("/myproducts")
            else {
                setProdName("")
                setProdFeature("")
                setProdDesc("")
                setRent("")
                setDeposite("")
                setCategory("Furnitures")
                setProdImg1("")
                setProdImg2("")
            }
        }).catch((err) => {
            alert(err.data)
        })
    }
    return (
        <>
            <HomeHeader />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <h3>Sell Product</h3><hr />
                    <form onSubmit={sellProd}>
                        <div className="form-outline mb-4">
                            <input type="text" id="form6Example5" className="form-control" required value={productName} onChange={(e) => setProdName(e.target.value)} />
                            <label className="form-label" htmlFor="form6Example5">Product Name</label>
                             <Notch />
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="form6Example3" className="form-control" value={productFeatures} required onChange={(e) => setProdFeature(e.target.value)} />
                            <label className="form-label" htmlFor="form6Example3">Product Feature</label>
                            <Notch />
                        </div>

                        <div className="form-outline mb-4">
                            <textarea className="form-control" id="form6Example7" rows="4" value={productDescription} required onChange={(e) => setProdDesc(e.target.value)} ></textarea>
                            <label className="form-label" htmlFor="form6Example7">Product Description</label>
                            <Notch />
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <input type="number" id="form6Example1" className="form-control" required value={rentalPrice} onChange={(e) => setRent(e.target.value)} />
                                    <label className="form-label" htmlFor="form6Example1">Rental Price</label>
                                    <Notch />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <input type="number" id="form6Example1" className="form-control" required value={deposite} onChange={(e) => setDeposite(e.target.value)} />
                                    <label className="form-label" htmlFor="form6Example1">deposite</label>
                                    <Notch />
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

                        <div className="form-outline mt-4">
                            <input type="file" className="form-control" id="customFile" accept="image/*" required onChange={(e) => setProdImg1(e.target.files[0])} />
                            {/* <label className="form-label" for="customFile">Profile Image</label> */}
                            {/* <Notch /> */}
                        </div>

                        <div className="form-outline my-4">
                            <input type="file" className="form-control" id="customFile" accept="image/*" required onChange={(e) => setProdImg2(e.target.files[0])} />
                            {/* <label className="form-label" for="customFile">Profile Image</label> */}
                            {/* <Notch /> */}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Sell Product</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}