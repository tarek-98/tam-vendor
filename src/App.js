import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import ProductSingle from "./pages/ProductSingle";
import EditInfo from "./components/user/EditInfo";
import EditAddress from "./components/user/EditAddress";
import UserAddress from "./components/user/UserAddress";
import AddAddress from "./components/user/AddAddress";
import Login from "./components/login/LogIn";
import HeadPc from "./components/head/HeadPc";
import Shipping from "./components/shipping/Shipping";
import NewVendor from "./components/user/NewVendor";
import Register from "./components/login/Register";
import VerifyEmailPage from "./components/login/VerifyEmailPage";
import AddProduct from "./components/product/AddProduct";
import AddedSucssess from "./components/product/AddedSucssess";
import AllProducts from "./components/product/AllProducts";
import OrdersList from "./components/product/OrdersList";
import CouponPage from "./components/coupon/CouponPage";
import IncomeReport from "./components/reports/IncomeReport";

function App() {
  return (
    <div id="App" className="">
      <div className="home-page">
        <div className="page-container">
          <BrowserRouter>
            <Footer />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/addVendor" element={<NewVendor />} />
                <Route path="/product/:id" element={<ProductSingle />} />
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/profile/shipping" element={<Shipping />}></Route>
                <Route path="/profile/editInfo" element={<EditInfo />} />
                <Route path="/profile/address" element={<UserAddress />} />
                <Route path="/profile/address/add" element={<AddAddress />} />
                <Route
                  path="/profile/address/editAddress/:id"
                  element={<EditAddress />}
                />
                <Route path="/profile/addProduct" element={<AddProduct />} />
                <Route path="/profile/productslist" element={<AllProducts />} />
                <Route path="/profile/orderslist" element={<OrdersList />} />
                <Route path="/profile/coupons" element={<CouponPage />} />
                <Route
                  path="/profile/incomereport"
                  element={<IncomeReport />}
                />
                <Route
                  path="/profile/addProduct/added"
                  element={<AddedSucssess />}
                />
              </Routes>
            </div>
            <HeadPc />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
