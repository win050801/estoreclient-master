import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {

  const [isAddUserModalOpen, setisAddUserModalOpen] = useState(false);
  const[openThanhToan,setOpenThanhToan] = useState(false);
  const [user,setUser] =useState(undefined)
  const product = JSON.parse(localStorage.getItem("cart"));
  // const dropdownRef = useRef(null);
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const clearState = () => {
    setisAddUserModalOpen(false);
    setOpenThanhToan(false)
  };

  return (
    <AppContext.Provider
      value={{
        isAddUserModalOpen,
        setisAddUserModalOpen,
        user,
        setUser,
        clearState,
         product,
        openThanhToan,
        setOpenThanhToan
        
      }}
    >
      {children}
    </AppContext.Provider>
  );

}
