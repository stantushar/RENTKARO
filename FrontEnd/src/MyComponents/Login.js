import React, { useState } from 'react'
import Notch from './Notch';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

export default function Login(props) {
  // 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
  let navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  function loginUser(e){
    e.preventDefault()
    const user = { "userEmail": email, "userPassword": pass } 
    axios.post("http://localhost:8080/user",user,{ withCredentials: true }).then((resp) => {
      if(resp.data=="")
        navigate("/home")
      else
        alert(resp.data)
    }).catch((err) => {
      alert(err.data)
    })
  }
  function login(obj){
    if(obj=="google"){
      
    }
  }
  return (

    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
      <form onSubmit={loginUser}>
        <div className="text-center mb-3">
          <p>Log in with:</p>
          {
            props.favIcons.map((icon) => (
              <>
                <button type="button" className="btn btn-secondary btn-floating mx-1" onClick={()=>{login(icon)}} >
                  <i className={"fab fa-" + icon}></i>
                </button>
              </>
            ))
          }
        </div>

        <p className="text-center">or:</p>

        <div className="form-outline mb-4">
          <input type="email" id="loginName" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="form-label" htmlFor="loginName">Email</label>
          <Notch />
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="loginPassword" className="form-control" required value={pass} onChange={(e) => setPass(e.target.value)} />
          <label className="form-label" htmlFor="loginPassword">Password</label>
          <Notch />
        </div>

        <div className="row mb-4">
          <div className="col-md-6 d-flex justify-content-center">

            <div className="form-check mb-3 mb-md-0">
              <input className="form-check-input" type="checkbox" value="" id="loginCheck" defaultChecked />
              <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center">

            <a href="" onClick={(e) => { e.preventDefault(); navigate("/forgotpass") }}>Forgot password?</a>
          </div>
        </div>


        <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

      </form>
    </div>

  )
}
