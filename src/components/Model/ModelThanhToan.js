import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Image, Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
// import bg_user_default from "../../assets/images/bg_user_default.jfif";
import { EditOutlined } from "@ant-design/icons";
import "./style.css";

export default function InfoUserModal() {
    //   const { setIsUpdateInfoUserModalOpen,user } = React.useContext(AppContext);
    const { openThanhToan, setOpenThanhToan } =
        useContext(AppContext);
    const user = JSON.parse(localStorage.getItem("user"))
    const [ktra, setKtra] = useState(false)
    const handleUpdateInfoModal = () => {
        setKtra(false)
        setOpenThanhToan(false);
    };
    useEffect(() => {
        setKtra(openThanhToan)
    }, [openThanhToan])
    const handleCancel = () => {
        setOpenThanhToan(false);
    };



    return (
        <div>
            <Modal
                title="Thanh toán"
                open={ktra}
                onCancel={handleCancel}
                footer={null}


            >
                
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
            </Modal>
        </div>
    );
}
