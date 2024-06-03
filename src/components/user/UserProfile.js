import React, { useEffect } from "react";
import "./userProfile.css";
import { Link } from "react-router-dom";
import { FaCarAlt, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoIosGift, IoMdCloseCircle } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import logo1 from "../../assets/images/logo1.png";
import { fetchUsers } from "../../store/usersSlice";

function UserProfile() {
  const users = useSelector((state) => state.users);
  const id = 1;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers(id));
  }, []);

  function refresh() {
    window.location.reload();
  }
  return (
    <div className="user-profile">
      <div className="container">
        <div className="user-content">
          <div className="sign-up mb-4">
            <div className="close" onClick={() => refresh()}>
              <IoMdCloseCircle />
            </div>
            <div className="user-icon">
              <div className="image ms-3">
                <img src={logo1} alt="" />
              </div>
              <div className="user-name d-flex">
                <div className="d-flex flex-row-reverse">
                  <span className="ms-1">{users.firstname}</span>
                  <span>{users.lastname}</span>
                </div>
                <div className="user-ph text-center mb-2">
                  <span className="text-dark">{users.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="user-options">
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/editInfo">
                <FaUserEdit />
                <span>تحرير معلومات الحساب</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link to="/profile/addProduct" className="user-item d-flex w-100">
                <FaCartPlus />
                <span>اضافة منتج جديد</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link
                to="/profile/productslist"
                className="user-item d-flex w-100"
              >
                <FaShoppingCart />
                <span>قائمة المنتجات</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100">
                <TbReportSearch />
                <span>تقارير المبيعات</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/incomereport">
                <TbReportSearch />
                <span>تقارير الدخل</span>
              </Link>
            </div>
            <div className="user-option-item orders">
              <Link to="/profile/orderslist" className="user-item d-flex w-100">
                <FaLocationDot />
                <div className="orderStatue">
                  <span className="complete-order">5</span>
                  <span className="pending-order">3</span>
                  <span className="reject-order">6</span>
                </div>
                <span>الطلبات</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/coupons">
                <IoIosGift />
                <span>اضافة كوبون</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/shipping">
                <FaCarAlt />
                <span>خدمات الشحن و التوصيل</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="">
                <IoCloudUploadSharp />
                <span className="col-rd text-danger">NEW</span>
                <span>طلب اعلان خاص</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
