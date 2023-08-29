import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
function NavBar() {
  let navigate = useNavigate();
  return (
    <nav
      style={{
        background: "#16697A",
        color: "white",
      }}
      className="navbar navbar-expand-lg navbar-light"
    >
      <div className="container justify-content-center justify-content-md-between">
        <button
          className="navbar-toggler border py-2 text-dark"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarLeftAlignExample"
          aria-controls="navbarLeftAlignExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link text-light"
                aria-current="page"
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/category?category=furnitures&num=0");
                }}
              >
                Furnitures
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-light  "
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/category?category=vehicles&num=0");
                }}
              >
                Vehicles
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-light  "
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/category?category=electronics&num=0");
                }}
              >
                Electronics
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-light  "
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/category?category=clothes&num=0");
                }}
              >
                Clothes
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-light  "
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/category?category=others&num=0");
                }}
              >
                Others
              </a>
            </li>
            {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                Others
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item" href="#">Action</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Another action</a>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </li>
                            </ul>
                        </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
