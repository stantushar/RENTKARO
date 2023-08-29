import React, { useEffect, useState }  from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"

export default function ForgotPass() {
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    function resetPass(e) {
        e.preventDefault()
        axios.get("http://localhost:8080/user/forgotpassword/"+email, { withCredentials: true }).then((resp) => {
            if (resp.data == ""){
                alert("please check the mail...")
                navigate("/")
            }
            else
                alert(resp.data)
        }).catch((err) => {
            alert(err.data)
        })
    }
    return (
        <div class="col d-flex justify-content-center m-5">
            <div className="card text-center" style={{ width: "50%" }}>
                <div className="card-header h5 text-white bg-primary">Password Reset</div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        Enter your email address and we'll send you an email with instructions to reset your password.
                    </p>
                    <form onSubmit={resetPass} >
                        <div className="form-outline">
                            <input type="email" id="typeEmail" className="form-control my-3" onChange={(e) => setEmail(e.target.value)} required/>
                            <label className="form-label" for="typeEmail">Email input</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Reset password</button>
                    </form>
                        <div className="d-flex justify-content-center mt-4">
                            <a className="" href="" onClick={(e) => { e.preventDefault(); navigate("/") }}>back to login</a>
                        </div>
                </div>
            </div>
        </div>
    )
}
