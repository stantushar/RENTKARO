import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Product from "./Product";

function ProdDetails(props) {
  let navigate = useNavigate();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const [prod1, setProdImg1] = useState(null);
  const [prod2, setProdImg2] = useState(null);
  const loadProducts = async () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const prodid = queryParameters.get("prodid");

    await axios
      .get("http://localhost:8080/product/" + prodid, { withCredentials: true })
      .then((resp) => {
        setProduct(resp.data);
        axios
          .get("http://localhost:8080/product/prodimage?prodid=" + prodid)
          .then((resp) => {
            const imageUrl1 = `data:image/png;base64,${resp.data[0]}`;
            const imageUrl2 = `data:image/png;base64,${resp.data[1]}`;

            setProdImg1(imageUrl1);
            setProdImg2(imageUrl2);
          })
          .catch((err) => {
            alert(err.data);
          });
      })
      .catch((err) => {
        navigate("/");
      });
  };
  async function rentProd(prodid) {
    // const queryParameters = new URLSearchParams(window.location.search)
    // const prodid = queryParameters.get("prodid")
    const flag = window.confirm(
      "Are you sure want to Rent product? Remember you can only rent one product at a time."
    );
    if (flag) {
      await axios
        .get("http://localhost:8080/product/rent/" + prodid, {
          withCredentials: true,
        })
        .then((resp) => {
          alert("product rented successfully");
          navigate("/profile");
        })
        .catch((err) => {
          alert("Sorry but you cant rent multiple products");
          navigate("/home");
        });
    } else {
      navigate("/home");
    }
  }
  function addToWishList(prodid) {}
  const queryParameters = new URLSearchParams(window.location.search);
  const prodid = queryParameters.get("id");
  async function deleteProd() {
    const flag = window.confirm("Are you sure want to Delete product?");
    if (flag) {
      await axios
        .delete("http://localhost:8080/profile/myproduct/" + prodid, {
          withCredentials: true,
        })
        .then((resp) => {
          alert(resp.data);
          navigate("/myproducts");
        })
        .catch((err) => {
          alert("product not found!!!");
          navigate("/myproducts?num=0");
        });
    } else {
      navigate("/myproducts?num=0");
    }
  }
  return (
    <>
      <HomeHeader />
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6 h-100">
              <div className="border rounded-4 mb-3 d-flex justify-content-center" >
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  data-type="image"
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",

                    }}
                    className="rounded-4 fit"
                    src={prod2}
                  />
                </a>
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{product.productName}</h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fas fa-star-half-alt" />
                    <span className="ms-1">4.5</span>
                  </div>
                </div>
                <p>{product.productDescription}</p>
                <div className="row">
                  <dt className="col-3">Rental Price:</dt>
                  <dd className="col-9">{product.rentalPrice}</dd>
                  <dt className="col-3">Deposite:</dt>
                  <dd className="col-9">{product.deposite}</dd>
                  <dt className="col-3">Feature:</dt>
                  <dd className="col-9">{product.productFeatures}</dd>
                  <dt className="col-3">Category:</dt>
                  <dd className="col-9">{product.category}</dd>
                  <dt className="col-3">Complains:</dt>
                  <dd className="col-9">{product.productComplain}</dd>
                </div>
                <hr />
                {/* <div className="row mb-4">
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">For Number of days</label>
                                        <div className="input-group mb-3" style={{ width: 170 }}>
                                            <button
                                                className="btn btn-white border border-secondary px-3"
                                                type="button"
                                                id="button-addon1"
                                                data-mdb-ripple-color="dark"
                                            >
                                                <i className="fas fa-minus" />
                                            </button>
                                            <input
                                                type="text"
                                                className="form-control text-center border border-secondary"
                                                placeholder={14}
                                                aria-label="Example text with button addon"
                                                aria-describedby="button-addon1"
                                            />
                                            <button
                                                className="btn btn-white border border-secondary px-3"
                                                type="button"
                                                id="button-addon2"
                                                data-mdb-ripple-color="dark"
                                            >
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                {(() => {
                  if (product.ownerId == null) {
                    return (
                      <div className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto row">
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            rentProd(product.productId);
                          }}
                          className="btn col-9 btn-primary shadow-0"
                        >
                          Rent
                        </a>
                        <div className="col-1" />
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            addToWishList(product.productId);
                          }}
                          className="btn btn-light border px-2 pt-2 col-2 icon-hover"
                        >
                          <i className="fas fa-heart fa-lg text-secondary px-1"></i>
                        </a>
                      </div>
                    );
                  } else {
                    return (
                      <div className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto row">
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/updateprod?prodid=" + prodid);
                          }}
                          className="btn col-5 btn-primary shadow-0"
                        >
                          Edit
                        </a>
                        <div className="col-2" />
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            deleteProd();
                          }}
                          className="btn col-5 btn-danger shadow-0"
                        >
                          Delete
                        </a>
                      </div>
                    );
                  }
                })()}
              </div>
            </main>
          </div>
        </div>
      </section>
      {/* <section className="bg-light border-top py-4">
                <div className="container">
                    <div className="row gx-4">
                        <div className="col-lg-4">
                            <div className="px-0 border rounded-2 shadow-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Similar items</h5>
                                        <div className="d-flex mb-3">
                                            <a href="#" className="me-3">
                                                <img
                                                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                                                    style={{ minWidth: 96, height: 96 }}
                                                    className="img-md img-thumbnail"
                                                />
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1">
                                                    Rucksack Backpack Large <br />
                                                    Line Mounts
                                                </a>
                                                <strong className="text-dark"> $38.90</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex mb-3">
                                            <a href="#" className="me-3">
                                                <img
                                                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                                                    style={{ minWidth: 96, height: 96 }}
                                                    className="img-md img-thumbnail"
                                                />
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1">
                                                    Summer New Men's Denim <br />
                                                    Jeans Shorts
                                                </a>
                                                <strong className="text-dark"> $29.50</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex mb-3">
                                            <a href="#" className="me-3">
                                                <img
                                                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                                                    style={{ minWidth: 96, height: 96 }}
                                                    className="img-md img-thumbnail"
                                                />
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1">
                                                    {" "}
                                                    T-shirts with multiple colors, for men and lady{" "}
                                                </a>
                                                <strong className="text-dark"> $120.00</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <a href="#" className="me-3">
                                                <img
                                                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp"
                                                    style={{ minWidth: 96, height: 96 }}
                                                    className="img-md img-thumbnail"
                                                />
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1">
                                                    {" "}
                                                    Blazer Suit Dress Jacket for Men, Blue color{" "}
                                                </a>
                                                <strong className="text-dark"> $339.90</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
      <Footer />
    </>
  );
}

export default ProdDetails;
