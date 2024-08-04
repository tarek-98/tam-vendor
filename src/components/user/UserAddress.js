import React, { useEffect, useState } from "react";
import "./userProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserProfile, fetchUsers } from "../../store/usersSlice";

function UserAddress() {
  const users = useSelector((state) => state.users);
  const [addAddress, setAddAddress] = useState(false);
  const [oldAddress, setOldAddress] = useState(true);
  const id = 1;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile(id));
  }, []);
  return (
    <div className="user-profile">
      <div className="user-address">
        <div className={oldAddress ? "old-address" : "old-address-hide"}>
          <div className="main-title">
            <h1>العناوين</h1>
            <p className=" text-dark-50">
              أدر عناوينك المحفوظة لتتمكن من إنهاء عمليات الشراء بسرعة وسهولة
              عبر متجرنا
            </p>
            <p
              className="add"
              onClick={() => {
                setAddAddress(true);
                setOldAddress(false);
              }}
            >
              إضافة عنوان جديد
            </p>
          </div>
          <div className="address-info">
            <div className="default">
              <h1></h1>
            </div>
            <div className="city-address">
              <span>المدينة : </span>
              <span>{users.city}</span>
            </div>
            <div className="address-address">
              <span>العنوان : </span>
              <span>{users.address}</span>
            </div>
            <Link to="/profile/address/editAddress">تعديل</Link>
          </div>
        </div>
        <div className={addAddress ? "add-address" : "add-address-hide"}>
          <h1>addAddress</h1>
        </div>
      </div>
    </div>
  );
}

export default UserAddress;
