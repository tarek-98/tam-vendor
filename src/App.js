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
import Register from "./components/login/Register";
import VerifyEmailPage from "./components/login/VerifyEmailPage";
import VerifyOtp from "./components/login/VerifyOtp";
import AddProduct from "./components/product/AddProduct";
import AddedSucssess from "./components/product/AddedSucssess";
import AllProducts from "./components/product/AllProducts";
import OrdersList from "./components/product/OrdersList";
import CouponPage from "./components/coupon/CouponPage";
import IncomeReport from "./components/reports/IncomeReport";
import OrderInfo from "./components/product/OrderInfo";
import EditLogo from "./components/user/EditLogo";
import Notifications from "./components/notifications/Notifications";
import Tabby from "./components/tabby/Tabby";
import LoginSucess from "./components/login/LoginSucess";
import VerifyLogin from "./components/login/VerifyLogin";
import Bocket from "./components/bocket/Bocket";
import { useSelector } from "react-redux";
import Chat from "./components/chat/Chat";
import Inbox from "./components/chat/Inbox";
import ReviewList from "./components/review/ReviewList";
import EditProduct from "./components/product/EditProduct";
import ConversationsPage from "./components/chat/ConversationList";

function App() {
  const { isAuthenticated, error, vendorInfo, status } = useSelector(
    (state) => state.auth
  );

  if (vendorInfo.data.status === "pending" && isAuthenticated) {
    return (
      <div id="App" className="">
        <div className="home-page">
          <div className="page-container">
            <BrowserRouter>
              <Footer />
              <div className="main-content">
                <LoginSucess />
              </div>
              <HeadPc />
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="App" className="">
      <div className="home-page">
        <div className="page-container">
          <BrowserRouter>
            <Footer />
            <div className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={isAuthenticated ? <Home /> : <Login />}
                ></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/addvendor" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/verifyLogin" element={<VerifyLogin />} />
                <Route path="/verify-phone" element={<VerifyOtp />} />
                <Route
                  path="/register-sucssess"
                  element={isAuthenticated ? <LoginSucess /> : <Login />}
                />
                <Route
                  path="/product/:id"
                  element={isAuthenticated ? <ProductSingle /> : <Login />}
                />
                <Route
                  path="/product/edit/:id"
                  element={isAuthenticated ? <EditProduct /> : <Login />}
                />
                <Route
                  path="/search"
                  element={isAuthenticated ? <SearchPage /> : <Login />}
                ></Route>
                <Route
                  path="/profile"
                  element={isAuthenticated ? <Profile /> : <Login />}
                ></Route>
                <Route
                  path="/profile/inbox"
                  element={isAuthenticated ? <Inbox /> : <Login />}
                ></Route>
                <Route
                  path="/profile/inbox/conversations"
                  element={isAuthenticated ? <ConversationsPage /> : <Login />}
                ></Route>
                <Route
                  path="/profile/inbox/conversations/chat"
                  element={isAuthenticated ? <Chat /> : <Login />}
                ></Route>
                <Route
                  path="profile/inbox/chat/:id"
                  element={isAuthenticated ? <Chat /> : <Login />}
                ></Route>
                <Route
                  path="/profile/bocket"
                  element={isAuthenticated ? <Bocket /> : <Login />}
                ></Route>
                <Route
                  path="/profile/shipping"
                  element={isAuthenticated ? <Shipping /> : <Login />}
                ></Route>
                <Route
                  path="/profile/payments"
                  element={isAuthenticated ? <Tabby /> : <Login />}
                ></Route>
                <Route
                  path="/profile/notification"
                  element={isAuthenticated ? <Notifications /> : <Login />}
                ></Route>
                <Route
                  path="/profile/editInfo"
                  element={isAuthenticated ? <EditInfo /> : <Login />}
                />
                <Route
                  path="/profile/editlogo"
                  element={isAuthenticated ? <EditLogo /> : <Login />}
                />
                <Route
                  path="/profile/address"
                  element={isAuthenticated ? <UserAddress /> : <Login />}
                />
                <Route
                  path="/profile/address/add"
                  element={isAuthenticated ? <AddAddress /> : <Login />}
                />
                <Route
                  path="/profile/address/editAddress/:id"
                  element={isAuthenticated ? <EditAddress /> : <Login />}
                />
                <Route
                  path="/profile/addProduct"
                  element={isAuthenticated ? <AddProduct /> : <Login />}
                />
                <Route
                  path="/profile/productslist"
                  element={isAuthenticated ? <AllProducts /> : <Login />}
                />
                <Route
                  path="/profile/orderslist"
                  element={isAuthenticated ? <OrdersList /> : <Login />}
                />
                <Route
                  path="/profile/orderslist/:id"
                  element={isAuthenticated ? <OrderInfo /> : <Login />}
                />
                <Route
                  path="/profile/coupons"
                  element={isAuthenticated ? <CouponPage /> : <Login />}
                />
                <Route
                  path="/profile/review"
                  element={isAuthenticated ? <ReviewList /> : <Login />}
                />
                <Route
                  path="/profile/incomereport"
                  element={isAuthenticated ? <IncomeReport /> : <Login />}
                />
                <Route
                  path="/profile/addProduct/added"
                  element={isAuthenticated ? <AddedSucssess /> : <Login />}
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
