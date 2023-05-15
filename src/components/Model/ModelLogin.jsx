import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Image, Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import { Link, useNavigate } from "react-router-dom";
// import bg_user_default from "../../assets/images/bg_user_default.jfif";
import { EditOutlined } from "@ant-design/icons";
import "./style.css";
import axios from "axios";
export default function InfoUserModal() {
  //   const { setIsUpdateInfoUserModalOpen,user } = React.useContext(AppContext);
  const[name,setName] = useState();
  const navigate = useNavigate()
  const { isAddUserModalOpen, setisAddUserModalOpen } =
    useContext(AppContext);
  const [user, setUser] = useState(undefined)
  const [adress,setAdress] = useState()
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")))
      // console.log((JSON.parse(localStorage.getItem("user"))));
      setName(JSON.parse(localStorage.getItem("user")).fullName)
      setAdress(JSON.parse(localStorage.getItem("user")).adress)
    }
  }, [isAddUserModalOpen])

  const [ktra, setKtra] = useState(false)
  const handleUpdateInfoModal = () => {
    setKtra(false)
    update()
    setisAddUserModalOpen(false);
  };
  useEffect(() => {
    setKtra(isAddUserModalOpen)
  }, [isAddUserModalOpen])
  const handleCancel = () => {
    setisAddUserModalOpen(false);
  };
  const update = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/updateName", {
          customerId:user.customerId,
          email: user.email,
          password:user.password,
          fullName:name,
          photo:"",
          admin:0,
          activated:1,
          adress:adress
      });

      //  if (data.status === false) {
      //    seter(data.msg);
      //  }

      //  else if (data.status === true) {
      //    // console.log(process.env.REACT_APP_LOCALHOST_KEY);

      
      localStorage.setItem(
          "user",
          JSON.stringify(data)
      ); 
      navigate("/")

      //  }
  } catch (error) {
      console.log(error);
     
  }
  }



  return (
    <div>
      <Modal
        title="Thông tin tài khoản"
        open={ktra}
        onCancel={handleCancel}
        footer={null}


      >
        {user !== undefined ? (<div>
          <div className="md-info-user-header">
            <Image
              className="md-info-user-img"
            // src={user.photoURL ? user.photoURL : bg_user_default}
            />
            <Avatar className="md-info-user-avt" size={70} src={user.photoURL}>
              {/* {user.photoURL ? "" : user.displayName?.charAt(0)?.toUpperCase()} */}
            </Avatar>
            <input type="text" style={{ border: "none", width: 200, height: 50, fontSize: 28, fontWeight: "bold" ,textAlign:"center"}} value={name} onChange={(e) => setName(e.target.value)}></input>
            {/* <span>{user.fullName}</span> */}
          </div>
          <div className="md-info-user-body">
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              Thông tin cá nhân
            </span>
            <div className="md-info-user-body-bd">
              <div className="md-info-user-body-bd-1">
                <span>Email</span>
                <span>Địa chỉ</span>

              </div>
              <div className="md-info-user-body-bd-2">
                <span>{user.email}</span>
                <input type="text" style={{ border: "none",textAlign:"center",paddingTop:5 }} value={adress} onChange={(e) => setAdress(e.target.value)}></input>
              </div>
            </div>

            <Button onClick={handleUpdateInfoModal}>
              <EditOutlined />
              Cập nhật thông tin
            </Button>
          </div>
        </div>) : (<div></div>)}

      </Modal>
    </div>
  );
}
