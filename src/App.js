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

  // if (vendorInfo.data.status === "pending" && isAuthenticated) {
  //   return (
  //     <div id="App" className="">
  //       <div className="home-page">
  //         <div className="page-container">
  //           <BrowserRouter>
  //             <Footer />
  //             <div className="main-content">
  //               <LoginSucess />
  //             </div>
  //             <HeadPc />
  //           </BrowserRouter>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
                <Route path="/register-sucssess" element={<LoginSucess />} />
                <Route path="/product/:id" element={<ProductSingle />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/profile/inbox" element={<Inbox />}></Route>
                <Route
                  path="/profile/inbox/conversations"
                  element={<ConversationsPage />}
                ></Route>
                <Route
                  path="/profile/inbox/conversations/chat"
                  element={<Chat />}
                ></Route>
                <Route path="profile/inbox/chat/:id" element={<Chat />}></Route>
                <Route path="/profile/bocket" element={<Bocket />}></Route>
                <Route path="/profile/shipping" element={<Shipping />}></Route>
                <Route path="/profile/payments" element={<Tabby />}></Route>
                <Route
                  path="/profile/notification"
                  element={<Notifications />}
                ></Route>
                <Route path="/profile/editInfo" element={<EditInfo />} />
                <Route path="/profile/editlogo" element={<EditLogo />} />
                <Route path="/profile/address" element={<UserAddress />} />
                <Route path="/profile/address/add" element={<AddAddress />} />
                <Route
                  path="/profile/address/editAddress/:id"
                  element={<EditAddress />}
                />
                <Route path="/profile/addProduct" element={<AddProduct />} />
                <Route path="/profile/productslist" element={<AllProducts />} />
                <Route path="/profile/orderslist" element={<OrdersList />} />
                <Route path="/profile/orderslist/:id" element={<OrderInfo />} />
                <Route path="/profile/coupons" element={<CouponPage />} />
                <Route path="/profile/review" element={<ReviewList />} />
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
