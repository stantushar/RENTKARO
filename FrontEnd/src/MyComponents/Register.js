import React, { useState } from 'react'
import Notch from './Notch';
import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

export default function Register() {
  const [fname, setFName] = useState('shree')
  const [lname, setLName] = useState('bandal')
  const [email, setEmail] = useState('')
  const [mobNo, setMobNo] = useState('')
  const [pass, setPass] = useState('Shree@123')
  const [coinfPass, setCoinfPass] = useState('Shree@123')
  const [add1, setAdd1] = useState('')
  const [add2, setAdd2] = useState('add2')
  const [city, setCity] = useState('')
  const [pin, setPin] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [profileImg, setProfileImg] = useState('')
  function registerUser(e) {
    e.preventDefault()
    const user = { fname, lname, email, mobNo, pass, coinfPass, add1, add2, city, pin, state, country }
    if (validateDetails(user)) {
      const data = {
        "firstName": user.fname,
        "lastName": user.lname,
        "userEmail": user.email,
        "userPassword": user.pass,
        "userMobileNo": user.mobNo,
        "address1": user.add1,
        "address2": user.add2,
        "city": user.city,
        "state": user.city,
        "pincode": user.pin,
        "country": user.country
      }

      axios.post("http://localhost:8080/user/signin", data).then((resp) => {
        const formData = new FormData();
        formData.append('image', profileImg);
        console.log(formData)

        axios.post("http://localhost:8080/user/profileimage?email=" + email, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        alert(resp.data)
        // window.location.reload()
      }).catch((err) => {
        alert(err.data)
      })
    }
  }
  const [errname, setErrName] = useState('')
  const [errmob, setErrMob] = useState('')
  const [errpass, setErrPass] = useState('')
  const [errimg, setErrImg] = useState('')
  function validateDetails(user) {
    let flag = 0
    if (user.fname.length < 2 || user.lname.length < 2 || user.fname.length > 20 || user.lname.length > 20)
      setErrName("length must be between 2 to 20")
    else if (!user.fname.match(/^[A-Za-z]+$/) || !user.lname.match(/^[A-Za-z]+$/))
      setErrName("please enter valid name(characters only)")
    else {
      setErrName("")
      flag++
    }
    if (user.mobNo.length != 10)
      setErrMob("please enter valid mobile number")
    else {
      setErrMob("")
      flag++
    }
    if (!user.pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/))
      setErrPass("password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special")
    else if (user.pass != user.coinfPass)
      setErrPass("password does not match")
    else {
      setErrPass("")
      flag++
    }
    if (profileImg.size > 10 * 1024 * 1024)
      setErrImg("Profile Size Must be less than 10 mb")
    else {
      setErrImg("")
      flag++
    }
    if (flag == 4) return true
    return false
  }
  return (
    <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
      <form onSubmit={registerUser}>
        <p>Sign in with:</p>
        <div className='row  mb-4'>
          <div className="form-outline col">
            <input type="text" id="registerName" className="form-control" required value={fname} onChange={(e) => setFName(e.target.value)} />
            <label className="form-label" htmlFor="registerName">First Name</label>
            <Notch />
          </div>

          <div className="form-outline col">
            <input type="text" id="registerUsername" className="form-control" required value={lname} onChange={(e) => setLName(e.target.value)} />
            <label className="form-label" htmlFor="registerUsername">Last name</label>
            <Notch />
          </div>
          <span className="text-danger">{errname}</span>
        </div>

        <div className="form-outline mb-4">
          <input type="email" id="registerEmail" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="form-label" htmlFor="registerEmail">Email</label>
          <Notch />
        </div>

        <div className="form-outline">
          <input type="number" id="registerMobile" className="form-control" required value={mobNo} onChange={(e) => setMobNo(e.target.value)} />
          <label className="form-label" htmlFor="registerMobile">Mobile No.</label>
          <Notch />
        </div>
        <span className="text-danger">{errmob}</span>

        <div className='row'>
          <div className="form-outline mt-4 col" >
            <input type="password" id="registerPassword" className="form-control" required value={pass} onChange={(e) => setPass(e.target.value)} />
            <label className="form-label" htmlFor="registerPassword">Password</label>
            <Notch />
          </div>

          <div className="form-outline mt-4 col">
            <input type="password" id="registerRepeatPassword" className="form-control" required value={coinfPass} onChange={(e) => setCoinfPass(e.target.value)} />
            <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
            <Notch />
          </div>
          <span className="text-danger">{errpass}</span>
        </div>

        <div className='row'>
          <div className="form-outline mt-4 col">
            <input type="text" id="address1" className="form-control" required value={add1} onChange={(e) => setAdd1(e.target.value)} maxLength="50" />
            <label className="form-label" htmlFor="address1">Address1</label>
            <Notch />
          </div>

          <div className="form-outline mt-4 col">
            <input type="text" id="address2" className="form-control" required value={add2} onChange={(e) => setAdd2(e.target.value)} maxLength="50" />
            <label className="form-label" htmlFor="address2">Address2</label>
            <Notch />
          </div>
        </div>

        <div className='row'>
          <div className="form-outline mt-4 col">
            <input type="text" id="city" className="form-control" required value={city} onChange={(e) => setCity(e.target.value)} maxLength="30" />
            <label className="form-label" htmlFor="city">City</label>
            <Notch />
          </div>

          <div className="form-outline mt-4 col">
            <input type="number" id="pin" className="form-control" required value={pin} onChange={(e) => setPin(e.target.value)} maxLength="10" />
            <label className="form-label" htmlFor="pin">Pin code</label>
            <Notch />
          </div>
        </div>

        <div className='row'>
          <div className="form-outline mt-4 col">
            <input type="text" id="state" className="form-control" required value={state} onChange={(e) => setState(e.target.value)} maxLength="20" />
            <label className="form-label" htmlFor="state">State</label>
            <Notch />
          </div>

          <div className="form-outline mt-4 col">
            <input type="text" id="country" className="form-control" required value={country} onChange={(e) => setCountry(e.target.value)} maxLength="20" />
            <label className="form-label" htmlFor="country">Country</label>
            <Notch />
          </div>
        </div>

        <div className="form-outline mt-4">
          <input type="file" className="form-control" id="customFile" accept="image/*" required onChange={(e) => setProfileImg(e.target.files[0])} />
          {/* <label className="form-label" for="customFile">Profile Image</label> */}
          {/* <Notch /> */}
        </div>
          <span className="text-danger">{errimg}</span>

        <div className="form-check d-flex justify-content-center mt-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="registerCheck"
            defaultChecked
            aria-describedby="registerCheckHelpText"
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-3">Sign in</button>
      </form>
    </div>
  )
}
