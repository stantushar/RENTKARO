import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
function Logout(){
    let navigate = useNavigate()
    useEffect(() => {
        logout()
    }, [])
    const logout = async () => {
        await axios.get("http://localhost:8080/user/logout", { withCredentials: true }).then((resp) => {
            navigate("/")
        }).catch((err) => {
            navigate("/")
        })
    }
}
export default Logout