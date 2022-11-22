import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddUserModalOpen, setisAddUserModalOpen] = useState(false);
  const[openThanhToan,setOpenThanhToan] = useState(false);
  const [user,setUser] =useState(undefined)
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
        openThanhToan,
        setOpenThanhToan
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
