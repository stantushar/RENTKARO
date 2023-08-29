import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
function RentProd() {
    let navigate = useNavigate()
    function rentProd() {
        if (flag==undefined) {
            const queryParameters = new URLSearchParams(window.location.search)
            const prodid = queryParameters.get("prodid")
            var flag = window.confirm("Are you sure want to Rent product? Remember you can only rent one product at a time.")
            if (flag) {
                axios.get("http://localhost:8080/product/rent/" + prodid, { withCredentials: true }).then((resp) => {
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
    }
    rentProd()
    return (<></>)
}
export default RentProd