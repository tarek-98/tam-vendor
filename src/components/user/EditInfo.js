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
import { editVendorNonPremmision } from "../../store/vendorSlice";

function EditInfo() {
  const dispatch = useDispatch();
  const { vendorInfo } = useSelector((state) => state.auth);
  const idVendor = vendorInfo && vendorInfo.data._id;

  const [formData, setFormData] = useState({
    vendorName: (vendorInfo && vendorInfo.data.vendorName) || "",
    vendorEmail: (vendorInfo && vendorInfo.data.vendorEmail) || "",
    vendorPhone: (vendorInfo && vendorInfo.data.vendorPhone) || "",
  });
  const originalData = {
    vendorName: vendorInfo && vendorInfo.data.vendorName,
    vendorEmail: vendorInfo && vendorInfo.data.vendorEmail,
    vendorPhone: vendorInfo && vendorInfo.data.vendorPhone,
  };

  useEffect(() => {
    setFormData({
      vendorName: (vendorInfo && vendorInfo.data.vendorName) || "",
      vendorEmail: (vendorInfo && vendorInfo.data.vendorEmail) || "",
      vendorPhone: (vendorInfo && vendorInfo.data.vendorPhone) || "",
    });
  }, [vendorInfo && vendorInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmet = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        editVendorNonPremmision({
          idVendor,
          originalData,
          updatedData: formData,
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
                name="vendorName"
                value={formData.vendorName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>رقم الجوال</Form.Label>
              <Form.Control
                type="text"
                placeholder={vendorInfo && vendorInfo.data.vendorPhone}
                name="vendorPhone"
                value={formData.vendorPhone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>الايميل</Form.Label>
              <Form.Control
                type="email"
                placeholder={vendorInfo && vendorInfo.data.vendorEmail}
                name="vendorEmail"
                value={formData.vendorEmail}
                onChange={handleChange}
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
