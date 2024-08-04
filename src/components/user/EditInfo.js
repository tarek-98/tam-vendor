import React, { useEffect, useState } from "react";
import "./userProfile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { fetchUsers } from "../../store/usersSlice";
import { editVendorNonPremmision } from "../../store/vendorSlice";

function EditInfo() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { vendorInfo } = useSelector((state) => state.auth);

  const formSubmet = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        editVendorNonPremmision({
          idVendor: vendorInfo && vendorInfo.data._id,
          vendorName: firstName === "" ? vendorInfo.data.vendorName : firstName,
          vendorEmail: email === "" ? vendorInfo.data.vendorEmail : email,
          vendorPhone: phone === "" ? vendorInfo.data.vendorPhone : phone,
        })
      );
    } catch (error) {
      console.error("vendor verification edited:", error);
    }
  };

  return (
    <div className="user-profile">
      <div className="container">
        <div className="logo mb-3">
          <img src={logo} alt="" className="logo w-100" />
        </div>
        <div className="back back-edit">
          <Link
            to="/profile"
            className="d-flex flex-row-reverse align-items-center text-dark pe-1 text-black-50 fs-6 mb-2"
          >
            <IoIosArrowRoundForward />
            <span>الرجوع الي الحساب</span>
          </Link>
        </div>
        <div className="form form-edit-info">
          <Form onSubmit={formSubmet}>
            <Form.Group className="mb-3" controlId="formBasicFirst">
              <Form.Label>الاسم</Form.Label>
              <Form.Control
                type="text"
                placeholder={vendorInfo && vendorInfo.data.vendorName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>رقم الجوال</Form.Label>
              <Form.Control
                type="text"
                placeholder={vendorInfo && vendorInfo.data.vendorPhone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>الايميل</Form.Label>
              <Form.Control
                type="email"
                placeholder={vendorInfo && vendorInfo.data.vendorEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              تعديل
            </Button>
          </Form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default EditInfo;
