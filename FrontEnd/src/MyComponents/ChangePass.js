import React, { useEffect, useState } from 'react'
import Notch from './Notch';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import axios from 'axios';

function ChangePass() {
    const [varifyPass, setVarifyPass] = useState('')
    const [pass, setPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [errpass, setErrPass] = useState('')
    const [errvarifypass, setVarifyErrPass] = useState('')
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
    function changePass(e) {
        e.preventDefault()
        let flag = false
        if (!newPass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/) || !pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/))
            setErrPass("password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special")
        else if (varifyPass != newPass)
            setVarifyErrPass("password does not match")
        else {
            setErrPass("")
            setVarifyErrPass("")
            flag = true
        }
        if (flag) {
            const user = {
                "userPassword": pass,
                "newPassword": newPass
            }
            axios.put("http://localhost:8080/user/changepassword", user, { withCredentials: true }).then((resp) => {
                alert(resp.data + " please login again...")
                navigate("/logout")
            }).catch((err) => {
                alert("Please Enter valid Password")
            })
        }
    }
    return (
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form onSubmit={changePass}>
                <div className="form-outline mb-4">
                    <input type="password" id="password" className="form-control" required value={pass} onChange={(e) => setPass(e.target.value)} />
                    <label className="form-label" htmlFor="password">Old Password</label>
                    <Notch />
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" className="form-control" required value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                    <label className="form-label" htmlFor="loginPassword">New PassWord</label>
                    <Notch />
                </div>
                <span className="text-danger mb-4">{errpass}</span>
                <div className="form-outline mb-4">
                    <input type="password" id="reppassword" className="form-control" required value={varifyPass} onChange={(e) => setVarifyPass(e.target.value)} />
                    <label className="form-label" htmlFor="reppassword">Repeate Password</label>
                    <Notch />
                </div>
                <span className="text-danger mb-4">{errvarifypass}</span>
                <button type="submit" className="btn btn-primary btn-block mb-4">Update PassWord</button>
            </form>
        </div>
    )
}
export default ChangePass