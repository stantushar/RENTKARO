import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./HomeHeader.css";

function HomeHeader({ searchFunc }) {
  const [searchText, setSearchText] = useState("");

  let navigate = useNavigate();
  return (
    <>
      <div className="p-3 text-center bg-white border-bottom">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-2 col-sm-4 col-4">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home");
                }}
                className="float-start"
              >
                {/* <h4>RentKaro</h4> */}
                <div class="logo-holder logo-6">
                  <a href="">
                    <h3>
                      Rent<span>Karo</span>
                    </h3>
                  </a>
                </div>
              </a>
            </div>
            <div className="order-lg-last col-lg-6 col-sm-8 col-8">
              <div className="d-flex float-end">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/profile");
                  }}
                  className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                  target="_blank"
                >
                  {" "}
                  <i className="fas fa-user-alt m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Profile</p>{" "}
                </a>
                <a
                  href="https://github.com/mdbootstrap/bootstrap-material-design"
                  className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                  target="_blank"
                >
                  {" "}
                  <i className="fas fa-heart m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Wishlist</p>{" "}
                </a>
                {/* <a href="https://github.com/mdbootstrap/bootstrap-material-design" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My Products</p> </a> */}
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/sellproduct");
                  }}
                  className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                  target="_blank"
                >
                  {" "}
                  <i className="fas fa-arrow-up-from-bracket me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Sell Products</p>{" "}
                </a>
                <a
                  href=""
                  className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/logout");
                  }}
                >
                  {" "}
                  <i className="fas fa-arrow-right-to-bracket m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Logout</p>{" "}
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-12">
              <div className="input-group float-center">
                <div className="form-outline">
                  <input
                    onChange={(e) => setSearchText(e.target.value)}
                  type="search" id="form1" className="form-control" />
                  <label className="form-label" htmlFor="form1">
                    Search
                  </label>
                </div>
                <button 
                  onClick={() => searchFunc(searchText)}
                autoFocus type="button" className="btn btn-primary shadow-0">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeHeader;
