import { data } from "jquery";
import React, { useContext, useEffect, useState } from "react";

import "./bootstrap.css";
import "./responsive.css";
import "./ui.css";
import { AppContext } from "../../context/AppProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Cart() {
    const navigate = useNavigate()
    const { setOpenThanhToan } = useContext(AppContext);
    const [sum, setSum] = useState(0);
    const [orderDetals, setOrderDetals] = useState([]);
    const [user, setUser] = useState(undefined)
    const { product } = useContext(AppContext);
    const [productCart, setProductCart] = useState([]);
    var [count, setCount] = useState(1);
    var [total, setTotal] = useState(0);
    var [tongTien, setTongTien] = useState(0);

    data = [
        {
            name: "Nước hoa Gucci 105ml",
            size: "105 ml",
            quantity: 1,
            price: 1000,
            id: 7,
        },
        {
            name: "Nước hoa Chanel 200ml",
            size: "200 ml",
            quantity: 1,
            price: 2000,
            id: 7,
        },
        {
            name: "Nước hoa Hermet 105ml",
            size: "105 ml",
            quantity: 2,
            price: 3000,
            id: 11,
        },
    ];
    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")))
        }

    }, []);
    const hadleThanhToan = async () => {
        if (user !== undefined) {
            var sumTam = 0;
            var orderTam = [];
            const productCartTam = JSON.parse(localStorage.getItem("cart"))
            productCartTam.forEach((element) => {
                const su = element.price;
                console.log(element);
                orderTam.push({
                    unitPrice: element.unitPrice,
                    quantity: element.quantilyP,
                    discount: 0,
                    productId: element.productId,
                });
                sumTam += su;
            });
            console.log(orderTam);
            try {
                const response = await axios.post("http://localhost:5000/saveOrder", {
                    orderDate: null,
                    address: user.adress,
                    amount: 1000,
                    description: "Test",
                    customerId: user.customerId,
                    orderDetails: orderTam,
                });
                localStorage.setItem(
                    "cart",
                    JSON.stringify(
                        []
                    )
                );
                navigate("/")
            } catch (error) {
                alert("fail")
            }
        }
        else{
            navigate("/login")
        }

    };

    // const product = JSON.parse(localStorage.getItem("cart"));

    if(product)
    {
        for (let i = 0; i < product.length; i++) {
            tongTien += parseInt(product[i].unitPrice) * product[i].quantilyP;
            // console.log(tongTien);
        }
    }
    const handleQuantily = (e) => {
        const countP = document.getElementById(e.productId + "fruit").value;
        e.quantilyP = parseInt(countP);
        setProductCart(JSON.parse(localStorage.getItem("cart")));

        localStorage.setItem(
            "cart",
            JSON.stringify(
                product
            )
        );



    };
    useEffect(() => {
        setProductCart(product);
    }, [productCart]);

    return (
        <div className="App">
            <section class="section-pagetop bg">
                <div class="container">
                    <h2 class="title-page">Shopping cart</h2>
                </div>
            </section>

            <section class="section-content padding-y">
                <div class="container">
                    <div class="row">
                        <main class="col-md-9">
                            <div class="card">
                                <table class="table table-borderless table-shopping-cart">
                                    <thead class="text-muted">
                                        <tr class="small text-uppercase">
                                            <th scope="col">Product</th>
                                            <th scope="col" width="120">
                                                Quantity
                                            </th>
                                            <th scope="col" width="120">
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                class="text-right"
                                                width="200"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productCart.map((e, i) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <figure class="itemside">
                                                            <div class="aside">
                                                                <img
                                                                    src={
                                                                        e.image
                                                                    }
                                                                    class="img-sm"
                                                                />
                                                            </div>
                                                            <figcaption class="info">
                                                                <a
                                                                    href="#"
                                                                    class="title text-dark"
                                                                >
                                                                    {e.name}
                                                                </a>
                                                                <p class="small text-muted">
                                                                    Size: XL,
                                                                    Color: blue,
                                                                    Brand:
                                                                    Tissot
                                                                </p>
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td>
                                                        <select
                                                            value={e.quantilyP}
                                                            id={
                                                                e.productId +
                                                                "fruit"
                                                            }
                                                            class="form-control"
                                                            onChange={() => {
                                                                handleQuantily(
                                                                    e
                                                                );
                                                            }}
                                                        >
                                                            <option value="1">
                                                                1
                                                            </option>
                                                            <option
                                                                value="2"
                                                                defaultValue
                                                            >
                                                                2
                                                            </option>
                                                            <option value="3">
                                                                3
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <div class="price-wrap">
                                                            <var class="price">
                                                                {e.unitPrice}
                                                            </var>
                                                            <small class="text-muted">
                                                                ${e.unitPrice}{" "}
                                                                each
                                                            </small>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <a
                                                            data-original-title="Save to Wishlist"
                                                            title=""
                                                            href=""
                                                            class="btn btn-light mr-2"
                                                            data-toggle="tooltip"
                                                        >
                                                            <i class="fa fa-heart"></i>
                                                        </a>
                                                        <a
                                                            class="btn btn-light btn-round"
                                                            onClick={() => {
                                                                // delete product.e;

                                                                product.splice(
                                                                    i,
                                                                    1
                                                                );

                                                                localStorage.setItem(
                                                                    "cart",
                                                                    JSON.stringify(
                                                                        product
                                                                    )
                                                                );

                                                                setProductCart(
                                                                    JSON.parse(
                                                                        localStorage.getItem(
                                                                            "cart"
                                                                        )
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            Remove
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div class="card-body border-top">
                                    <a
                                        onClick={() => {
                                            setOpenThanhToan(true);
                                        }}
                                        href="#"
                                        class="btn btn-primary float-md-right"
                                    >
                                        Make Purchase
                                        <i class="fa fa-chevron-right"></i>
                                    </a>
                                    <a href="/" class="btn btn-light">
                                        <i class="fa fa-chevron-left"></i>
                                        Continue shopping
                                    </a>
                                </div>
                            </div>

                            <div class="alert alert-success mt-3">
                                <p class="icontext">
                                    <i class="icon text-success fa fa-truck"></i>
                                    Free Delivery within 1-2 weeks
                                </p>
                            </div>
                        </main>
                        <aside class="col-md-3">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <form>
                                        <div class="form-group">
                                            <label>Have coupon?</label>
                                            <div class="input-group">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name=""
                                                    placeholder="Coupon code"
                                                />
                                                <span class="input-group-append">
                                                    <button class="btn btn-primary">
                                                        Apply
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                    class="card-body"
                                >
                                    <dl class="dlist-align">
                                        <dt>Total price:</dt>

                                        <dd class="text-right">${tongTien}</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd class="text-right">0</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Total:</dt>
                                        <dd class="text-right  h5">
                                            <strong>${tongTien}</strong>
                                        </dd>
                                    </dl>
                                    <hr />
                                    <a
                                        onClick={() => {
                                            hadleThanhToan();
                                        }}
                                        href="#"
                                        class="btn btn-primary "
                                    >
                                        BUY
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section class="section-name bg padding-y">
                <div class="container">
                    <h6>Payment and refund policy</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                </div>
            </section>

            <footer class="section-footer border-top padding-y">
                <div class="container">
                    <p class="float-md-right">
                        &copy; Copyright 2020 All rights reserved
                    </p>
                    <p>
                        <a href="#">Terms and conditions</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
