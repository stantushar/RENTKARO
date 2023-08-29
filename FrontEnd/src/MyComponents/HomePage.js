import '../App.css';
import HomeHeader from "./HomeHeader";
import NavBar from "./NavBar";
import HomeBody from "./HomeBody";
import Footer from "./Footer";
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"

function HomePage() {
    let navigate = useNavigate()
    const [products, setProducts] = useState([])
    useEffect(() => {
        loadProducts()
    }, [])
    const loadProducts = async () => {
        await axios.get("http://localhost:8080/home", { withCredentials: true }).then((resp) => {
            setProducts(resp.data)
        }).catch((err) => {
            navigate("/")
        })
    }

    const handleSearch = async (searchTerm) => {
        console.log(searchTerm)
        console.log("kdkfhsdh")
        await axios.get(`http://localhost:8080/search/${searchTerm}`, { withCredentials: true }).then((resp) => {
            setProducts(resp.data)
        }).catch((err) => {
            navigate("/")
        })
    }

    return (
        <>
            <header>
                {/* <HomeHeader/> */}
                <HomeHeader searchFunc={handleSearch}/>
                <NavBar/>
            </header>
            <section>
                <HomeBody prod = {products}/>
            </section>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default HomePage;
