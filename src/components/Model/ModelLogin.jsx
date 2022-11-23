import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Image, Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
// import bg_user_default from "../../assets/images/bg_user_default.jfif";
import { EditOutlined } from "@ant-design/icons";
import "./style.css";

export default function InfoUserModal() {
//   const { setIsUpdateInfoUserModalOpen,user } = React.useContext(AppContext);
  const { isAddUserModalOpen, setisAddUserModalOpen } =
    useContext(AppContext);
    const [user,setUser] = useState(undefined)
    useEffect(()=>{
        if(localStorage.getItem("user"))
        {
             setUser(JSON.parse(localStorage.getItem("user")))
            // console.log((JSON.parse(localStorage.getItem("user"))));
        }
    },[isAddUserModalOpen])
   
    const[ktra,setKtra] = useState(false)
  const handleUpdateInfoModal = () => {
    setKtra(false)
    setisAddUserModalOpen(false);
  };
  useEffect(()=>{
    setKtra(isAddUserModalOpen)
  },[isAddUserModalOpen])
  const handleCancel = () => {
    setisAddUserModalOpen(false);
  };

  

  return (
    <div>
      <Modal
        title="Thông tin tài khoản"
        open={ktra}
        onCancel={handleCancel}
        footer={null}
       
       
      >
        {user!==undefined? (<div>
            <div className="md-info-user-header">
          <Image
            className="md-info-user-img"
            // src={user.photoURL ? user.photoURL : bg_user_default}
          />
          <Avatar className="md-info-user-avt" size={70} src={user.photoURL}>
            {/* {user.photoURL ? "" : user.displayName?.charAt(0)?.toUpperCase()} */}
          </Avatar>
          <span>{user.fullName}</span>
        </div>
        <div className="md-info-user-body">
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Thông tin cá nhân
          </span>
          <div className="md-info-user-body-bd">
            <div className="md-info-user-body-bd-1">
              <span>Email</span>
              <span>Giới tính</span>
              <span>Ngày sinh</span>
            </div>
            <div className="md-info-user-body-bd-2">
              <span>{user.email}</span>
              <span>Nam</span>
              <span>1/1/2001</span>
            </div>
          </div>

          <Button onClick={handleUpdateInfoModal}>
            <EditOutlined />
            Cập nhật thông tin
          </Button>
        </div>
        </div>):(<div></div>)}
        
      </Modal>
    </div>
  );
}
