import Home from "./pages/Home";
import ModelLogin from "./components/Model/ModelLogin";
import Login from "./pages/login/Login";
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
                </Routes>
                <ModelLogin />
            </AppProvider>
        </Router>
    );
}

export default App;
