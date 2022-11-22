import { data } from "jquery";
import React,{useContext, useEffect, useState} from "react";
import "./bootstrap.css";
import "./responsive.css";
import "./ui.css";

import { AppContext } from "../../context/AppProvider";
import axios from "axios";
export default function Cart() {
    const { setOpenThanhToan } =
    useContext(AppContext);
    const [sum,setSum] = useState(0)
    const [orderDetals,setOrderDetals]=useState([])
    data = [
        {
            name: "Nước hoa Gucci 105ml",
            size: "105 ml",
            quantity: 1,
            price: 1000,
            id:7
            
        },
        {
            name: "Nước hoa Chanel 200ml",
            size: "200 ml",
            quantity: 1,
            price: 2000,
            id:7
        },
        {
            name: "Nước hoa Hermet 105ml",
            size: "105 ml",
            quantity: 2,
            price: 3000,
            id:11
        }
    ]
    useEffect(()=>{
        var sumTam =0
        var orderTam =[]
        data.forEach(element => {
            const su = element.price
            orderTam.push({
                unitPrice:element.price,
                quantity:element.quantity,
                discount:0,
                productId:element.id
            })
            sumTam+=su
        });
        setSum(sumTam)
        setOrderDetals(orderTam)
        
    },[])
    const hadleThanhToan = async()=>{
        const response = await axios.post(
            "http://localhost:5000/saveOrder",
            {
                orderDate:null,
                address:"Thong nhat",
                amount:1000,
                description:"Test",
                customerId:3,
                orderDetails:orderDetals
                
            }
        );
    }
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
                                        {data.map((product, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <figure class="itemside">
                                                            <div class="aside">
                                                                <img
                                                                    src="assets/images/items/1.jpg"
                                                                    class="img-sm"
                                                                />
                                                            </div>
                                                            <figcaption class="info">
                                                                <a
                                                                    href="#"
                                                                    class="title text-dark"
                                                                >
                                                                    {product.name}
                                                                </a>
                                                                <p class="text-muted small">
                                                                    Size: {product.size},  <br /> Brand:
                                                                    Gucci
                                                                </p>
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td>
                                                        <select class="form-control">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <div class="price-wrap">
                                                            <var class="price">
                                                                ${product.price}
                                                            </var>
                                                            <small class="text-muted">
                                                                ${product.price}
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
                                                            href=""
                                                            class="btn btn-light"
                                                        >
                                                            Remove
                                                        </a>
                                                    </td>
                                                </tr>
                                            )

                                        })}


                                    </tbody>
                                </table>

                                <div class="card-body border-top">
                                    <a  
                                        onClick={()=>{setOpenThanhToan(true)}}
                                        href="#"
                                        class="btn btn-primary float-md-right"
                                    >
                                        Make Purchase
                                        <i class="fa fa-chevron-right"></i>
                                    </a>
                                    <a href="#" class="btn btn-light">
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
                                <div style={{display:"flex",flexDirection:"column"}} class="card-body">
                                    <dl class="dlist-align">
                                        <dt>Total price:</dt>
                                        <dd class="text-right">${sum}</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd class="text-right">0</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Total:</dt>
                                        <dd class="text-right  h5">
                                            <strong>${sum}</strong>
                                        </dd>
                                    </dl>
                                    <hr />
                                    <a  
                                        onClick={()=>{hadleThanhToan()}}
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
