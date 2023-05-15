import "./Login.css"
import { Button, Col, Input, Row, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppProvider";
function Login() {
    const { setUser } =
        useContext(AppContext);
    const navigate = useNavigate()
    const [er, seter] = useState("")
    const [name, setName] = useState("")
    const [phonenumber, setphone] = useState("")
    const [vlphone, setvlphone] = useState("")
    const [vlpass, setvlpass] = useState("")
    const [password, setpass] = useState("")
    const [checkOtp, setCheckOtp] = useState(true);
    const [email, setEmail] = useState()
    const [login, setLogin] = useState(true)
    const handleLogin = async () => {
        // if (validateForm()) {
        try {
            const { data } = await axios.post("http://localhost:5000/login/login", {
                email: email,
                password,
            });

            //  if (data.status === false) {
            //    seter(data.msg);
            //  }

            //  else if (data.status === true) {
            //    // console.log(process.env.REACT_APP_LOCALHOST_KEY);

            setUser(data)
            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );
            navigate("/");

            //  }
        } catch (error) {
            console.log(error);
            seter("Account or password is not valid!");
        }


        //  }


    };
    const handleregister = async () => {
        // if (validateForm()) {
            console.log(email);
        try {
            const { data } = await axios.post("http://localhost:5000/login/register", {
                customerId:email,
                email: email,
                password,
                fullName:name,
                photo:"",
                admin:0,
                activated:1
            });

            //  if (data.status === false) {
            //    seter(data.msg);
            //  }

            //  else if (data.status === true) {
            //    // console.log(process.env.REACT_APP_LOCALHOST_KEY);
            console.log(data);
            setUser(data)
            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );
            navigate("/");

            //  }
        } catch (error) {
            console.log(error);
            seter("Email exist!!");
        }


        //  }


    };
    return (
        <div className="wrapper-login">
            <Row>

                <Col className="login-body" span={24}>
                    <div style={{ display: checkOtp ? "block" : "none" }}>

                        {login === true ? (<form className="login-form">
                            <br></br>
                            <span className="login-header-logo">Login</span>
                            <div className="login-password-input">
                                <Input
                                    size="large"
                                    bordered={false}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    prefix={<MailOutlined />}
                                />
                            </div>
                            <span style={{ color: "red", paddingLeft: 50, fontSize: 15 }} >{vlphone}</span>
                            <br></br>
                            <div className="login-password-input">
                                <Input.Password
                                    size="large"
                                    bordered={false}
                                    placeholder="Mật khẩu"
                                    onChange={(e) => setpass(e.target.value)}
                                    prefix={<LockOutlined />}
                                />
                            </div>
                            <span style={{ color: "red", paddingLeft: 50, fontSize: 15 }} >{vlpass}</span>
                            <Button className="login-btn-login" onClick={() => handleLogin()} >
                                Đăng nhập
                            </Button>


                            <Link className="login-link" to="/repassword">
                                Quên mật khẩu?
                            </Link>
                            <span style={{ color: "red", textAlign: "center", fontSize: 16 }}>{er}</span>
                            <br></br>
                            <span style={{ textAlign: "center" }}>
                                Bạn chưa có tài khoản? <Link to="#" onClick={()=>{setLogin(false)}}>Đăng ký ngay!</Link>
                            </span>
                        </form>) : (<form className="login-form">
                            <br></br>
                            <span className="login-header-logo">Register</span>
                            <div className="login-password-input">
                                <Input
                                    size="large"
                                    bordered={false}
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    prefix={<UserOutlined />}
                                />
                            </div>
                            <span style={{ color: "red", paddingLeft: 50, fontSize: 15 }} >{vlphone}</span>
                            <br></br>
                            <div className="login-password-input">
                                <Input
                                    size="large"
                                    bordered={false}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    prefix={<MailOutlined />}
                                />
                            </div>
                            <span style={{ color: "red", paddingLeft: 50, fontSize: 15 }} >{vlphone}</span>
                            <br></br>
                            <div className="login-password-input">
                                <Input.Password
                                    size="large"
                                    bordered={false}
                                    placeholder="Mật khẩu"
                                    onChange={(e) => setpass(e.target.value)}
                                    prefix={<LockOutlined />}
/>
                            </div>
                            <span style={{ color: "red", paddingLeft: 50, fontSize: 15 }} >{vlpass}</span>
                            <Button className="login-btn-login" onClick={() => handleregister()} >
                                Đăng ký
                            </Button>


                            <span style={{ color: "red", textAlign: "center", fontSize: 16 }}>{er}</span>
                            <br></br>
                            <span style={{ textAlign: "center" }}>
                                Bạn đã có tài khoản? <Link to="#" onClick={()=>{setLogin(true)}}>Đăng nhập!</Link>
                            </span>
                        </form>)}


                    </div>

                    {/* <div style={{ display: !checkOtp ? "block" : "none" }}>
                        <AuthOtp />
                    </div> */}
                </Col>

            </Row>


        </div>
    )
}

export default Login