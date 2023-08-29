// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Register from "./MyComponents/Register";
// import Header from './MyComponents/Header';
import Login from "./MyComponents/Login";
import LoginHeader from "./MyComponents/LoginHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./MyComponents/HomePage";
import Categories from "./MyComponents/Categories";
import Logout from "./MyComponents/Logout";
import ForgotPass from "./MyComponents/ForgotPass";
import Profile from "./MyComponents/Profile";
import SellProduct from "./MyComponents/SellProduct";
import ProdDetails from "./MyComponents/ProdDetails";
import UpdateProd from "./MyComponents/UpdateProd";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="App">
              <div
                className="row align-items-center"
                style={{ height: 100 + "vh" }}
              >
                <div class="logo-holder logo-6">
                  <a href="">
                    <h3>
                      Rent<span>Karo</span>
                    </h3>
                  </a>
                </div>
                <div className="mx-auto col-10 col-md-8 col-lg-6">
                  <LoginHeader />
                  <div className="tab-content">
                    <Login
                      favIcons={["facebook-f", "google", "twitter", "github"]}
                    />
                    <Register />
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/category" element={<Categories />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/forgotpass" element={<ForgotPass />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/changepass" element={<Profile />} />
        <Route exact path="/myproducts" element={<Profile />} />
        {/* <Route exact path="/rentedproducts" element={<Profile />} /> */}
        <Route exact path="/orderhistory" element={<Profile />} />
        <Route exact path="/sellproduct" element={<SellProduct />} />
        <Route exact path="/product" element={<ProdDetails />} />
        <Route exact path="/myproduct" element={<ProdDetails />} />
        {/* <Route exact path="/rentproduct" element={<RentProd />} /> */}
        <Route exact path="/updateprod" element={<UpdateProd />} />
      </Routes>
    </Router>
  );
}

export default App;
