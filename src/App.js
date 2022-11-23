import Home from "./pages/Home";
import ModelLogin from "./components/Model/ModelLogin";
import ModelThanhToan from "./components/Model/ModelThanhToan";
import Login from "./pages/login/Login";
import Order from "./components/Cart/Order";
import AppProvider from "./context/AppProvider";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import SildeShow from "./components/SileShow/SildeShow";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <AppProvider>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<ProductDetail />} path="/productdeltail" />
                    <Route element={<Cart />} path="/cart" />
                    <Route element={<SildeShow />} path="/slideshow" />
                    <Route element={<Order />} path="/order" />
                </Routes>
                <ModelLogin />
              
            </AppProvider>
        </Router>
    );
}

export default App;
