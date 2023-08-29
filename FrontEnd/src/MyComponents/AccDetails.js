import React, { useEffect, useState } from 'react'
import Notch from './Notch';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

function AccDetails() {
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [add1, setAdd1] = useState('')
    const [add2, setAdd2] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [errname, setErrName] = useState('')
    const [profile, setProfile] = useState('')
    const [profileImg, setProfileImg] = useState(null)
    let navigate = useNavigate()
    useEffect(() => {
        GetDetails()
    }, [])
    const GetDetails = async () => {
        await axios.get("http://localhost:8080/profile", { withCredentials: true, }).then((resp) => {
            setProfile(resp.data)
        }).catch((err) => {
            navigate("/")
        })
        await axios.get("http://localhost:8080/user/profileimage", { withCredentials: true, responseType: 'arraybuffer', }).then((resp) => {
            // console.log(resp.data.get(0))
            const base64Image = btoa(
                new Uint8Array(resp.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            const imageUrl = `data:image/png;base64,${base64Image}`;
            setProfileImg(imageUrl);
        }).catch((err) => {
            alert(err.data)
        })
    }
    async function UpdateDetails(e) {
        e.preventDefault()
        if (validateDetails()) {
            if (fname != "") profile.firstName = fname
            if (lname != "") profile.lastName = lname
            if (add1 != "") profile.address1 = add1
            if (add2 != "") profile.address2 = add2
            if (city != "") profile.city = city
            if (pin != "") profile.pincode = pin
            if (state != "") profile.state = state
            if (country != "") profile.country = country

            await axios.put("http://localhost:8080/profile", profile, { withCredentials: true }).then((resp) => {
                setFName("")
                setLName("")
                setAdd1("")
                setAdd2("")
                setCity("")
                setPin("")
                setState("")
                setCountry("")
            }).catch((err) => {
                alert(err.data)
            })
        }
    }
    function validateDetails() {
        let flag = false
        if ((fname.length < 2 && fname.length != 0) || (lname.length < 2 && lname.length != 0) || fname.length > 20 || lname.length > 20)
            setErrName("length must be between 2 to 20")
        else {
            setErrName("")
            flag = true
        }
        return flag
    }
    async function deleteAcc() {
        const flag = window.confirm("Are you sure want to delete your account?")
        if (flag) {
            await axios.delete("http://localhost:8080/profile", { withCredentials: true }).then((resp) => {
                navigate("/")
            }).catch((err) => {
                alert(err.data)
            })
        }
    }
    return (
        <>
            <div class="text-center border-bottom mb-4 pb-3">
                <a href="" onClick={(e)=>{e.preventDefault()}}><img className="rounded-circle shadow-4-strong img-fluid" alt="avatar2" src={profileImg} style={{ maxWidth: '300px', maxHeight: '200px' }}/></a>
            </div>

            <form onSubmit={UpdateDetails}>
                <div className='row'>
                    <div className="form-outline col">
                        <input type="text" id="registerName" className="form-control" value={fname} onChange={(e) => setFName(e.target.value)} />
                        <label className="form-label" htmlFor="registerName">First Name : {profile.firstName}</label>
                        <Notch />
                    </div>

                    <div className="form-outline col">
                        <input type="text" id="registerUsername" className="form-control" value={lname} onChange={(e) => setLName(e.target.value)} />
                        <label className="form-label" htmlFor="registerUsername">Last Name : {profile.lastName}</label>
                        <Notch />
                    </div>
                    <span className="text-danger">{errname}</span>
                </div>

                <div className='row'>
                    <div className="form-outline mt-4 col">
                        <input type="text" id="address1" className="form-control" value={add1} onChange={(e) => setAdd1(e.target.value)} maxLength="50" />
                        <label className="form-label" htmlFor="address1">Add1 : {profile.address1}</label>
                        <Notch />
                    </div>

                    <div className="form-outline mt-4 col">
                        <input type="text" id="address2" className="form-control" value={add2} onChange={(e) => setAdd2(e.target.value)} maxLength="50" />
                        <label className="form-label" htmlFor="address2">Add2 : {profile.address2}</label>
                        <Notch />
                    </div>
                </div>

                <div className='row'>
                    <div className="form-outline mt-4 col">
                        <input type="text" id="city" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} maxLength="30" />
                        <label className="form-label" htmlFor="city">City : {profile.city}</label>
                        <Notch />
                    </div>

                    <div className="form-outline mt-4 col">
                        <input type="number" id="pin" className="form-control" value={pin} onChange={(e) => setPin(e.target.value)} maxLength="10" />
                        <label className="form-label" htmlFor="pin">Pin : {profile.pincode}</label>
                        <Notch />
                    </div>
                </div>

                <div className='row'>
                    <div className="form-outline mt-4 col">
                        <input type="text" id="state" className="form-control" value={state} onChange={(e) => setState(e.target.value)} maxLength="20" />
                        <label className="form-label" htmlFor="state">State : {profile.state}</label>
                        <Notch />
                    </div>

                    <div className="form-outline mt-4 col">
                        <input type="text" id="country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} maxLength="20" />
                        <label className="form-label" htmlFor="country">Country : {profile.country}</label>
                        <Notch />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Update</button>
            </form>
            <button type="button" onClick={deleteAcc} className="btn btn-danger btn-block mt-3">Delete Account</button>
        </>
    )
}
export default AccDetails