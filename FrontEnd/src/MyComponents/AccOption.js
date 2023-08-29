import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

function AccountOption() {
    let navigate = useNavigate()
    return (
        <div className="card d-lg-block mb-5" id="navbarSupportedContent">
            <div class="list-group" id="list-tab" role="tablist">
                <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="" role="tab" aria-controls="profile" onClick={(e)=>{ e.preventDefault(); navigate("/profile")}}>Profile</a>
                <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="" onClick={(e)=>{ e.preventDefault(); navigate("/myproducts?num=0")}} role="tab" aria-controls="messages">My Products</a>
                {/* <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="" onClick={(e)=>{ e.preventDefault(); navigate("/rentedproducts?num=0")}} role="tab" aria-controls="settings">Rented Products</a> */}
                <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="" onClick={(e)=>{ e.preventDefault(); navigate("/orderhistory")}} role="tab" aria-controls="settings">Order History</a>
                <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="" onClick={(e)=>{ e.preventDefault(); navigate("/changepass")}} role="tab" aria-controls="settings">Change Password</a>
            </div>
        </div>
    )
}
export default AccountOption