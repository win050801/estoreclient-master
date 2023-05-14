import { data } from "jquery";
import React, { useContext, useEffect, useState } from "react";
import "./bootstrap.css";
import "./responsive.css";
import "./ui.css";

import { AppContext } from "../../context/AppProvider";
import axios from "axios";
import { getValue } from "@testing-library/user-event/dist/utils";
export default function Order() {
    const [data, setData] = useState([])
    const [test, settest] = useState()
    const getproduct = async (id)=>{
        try {
            const pr = axios.get(
                `http://localhost:5000/product/`+id
            );
        return pr 
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        async function fetchData() {
            if (localStorage.getItem("user")) {
                const response = await axios.post(
                    "http://localhost:5000/getOrder/"+(JSON.parse(localStorage.getItem("user")).customerId),
                );
                const dataTam = []
                const allProduct = await axios.get(
                    `http://localhost:5000/getAllProduct`
                );
                console.log(allProduct);
                response.data.forEach(element => {
                    element.orderDetails.forEach(e => {
                        // const pr = axios.get(
                        //     `http://localhost:5000/product/${e.productId}`
                        // );
                        // var a;
                        // pr.then(function (result) {
                        //     e.name = result.data.name
                        //     e.image = result.data.image  
                        // })
                        allProduct.data.forEach(element => {
                            if(element.productId===e.productId)
                            {
                                e.name = element.name
                                e.image = element.image
                            }
                        });
                        dataTam.push(e)
                    });

                });



                setData(dataTam)



            }
        }
        fetchData();
    }, [])

    return (<>
        <main class="col-md-9">
            <h1 style={{ textAlign: "center" }}>Hóa đơn</h1>
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
                                                    src={product.image}
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
                                                    Size:XL,  <br /> Brand:
                                                    Gucci
                                                </p>
                                            </figcaption>
                                        </figure>
                                    </td>
                                    <td>
                                        <select class="form-control" value={product.quantity}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div class="price-wrap">
                                            <var class="price">
                                                ${product.unitPrice}
                                            </var>
                                            <small class="text-muted">
                                                ${product.unitPrice}
                                            </small>
                                        </div>
                                    </td>

                                </tr>
                            )

                        })}


                    </tbody>
                </table>


            </div>


        </main>
    </>)
}
