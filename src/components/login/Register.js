import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setEmail } from "../../store/authSlice";
import { useNavigate } from "react-router";
import "./register.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { isAuthenticated, error, phoneNumberRegister } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    vendorEmail: "",
    brandName: "",
    vendorName: "",
    vendorLocation: "",
    vendorPhone: phoneNumberRegister,
    typeOfLicense: "",
    licenseNumber: "",
    LicenseFile: null,
    registeredWithAddedTax: "",
    AddedTaxFile: null,
  });

  const saudiPhoneNumberRegex = /^0[0-9]{9}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const data = new FormData();
      data.append("vendorEmail", formData.vendorEmail);
      data.append("brandName", formData.brandName);
      data.append("vendorName", formData.vendorName);
      data.append("vendorLocation", formData.vendorLocation);
      data.append("vendorPhone", formData.vendorPhone);
      data.append("typeOfLicense", formData.typeOfLicense);
      data.append("licenseNumber", formData.licenseNumber);
      data.append("LicenseFile", formData.LicenseFile);
      data.append("registeredWithAddedTax", formData.registeredWithAddedTax);
      data.append("AddedTaxFile", formData.AddedTaxFile);
      if (saudiPhoneNumberRegex.test(formData.vendorPhone)) {
        dispatch(registerUser(data));
        dispatch(setEmail(formData.vendorEmail));
        navigate("/verify-email");
        console.log(data);
      } else {
        event.preventDefault();
        event.stopPropagation();
        toast.error("ادخل رقم جوال صالح", {
          position: "top-left",
        });
      }
    }
    setValidated(true);
  };

  useEffect(() => {
    document.title = "تسجيل تاجر جديد";
  }, []);

  return (
    <div className="register-main">
      <div className="container">
        <h1 className="mb-3 text-center">تسجيل تاجر جديد</h1>
        <div className="form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3 flex-column">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>اسم المتجر</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="اكتب اسم المتجر"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  ادخل اسم المتجر
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>اسم مسئول المتجر</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="اكتب اسم المسئول"
                  onChange={handleChange}
                  name="vendorName"
                  value={formData.vendorName}
                />
                <Form.Control.Feedback type="invalid">
                  ادخل اسم مسئول المتجر
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustomUsername">
                <Form.Label>مقر البائع</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="اكتب مقر البائع"
                    required
                    onChange={handleChange}
                    name="vendorLocation"
                    value={formData.vendorLocation}
                  />
                  <Form.Control.Feedback type="invalid">
                    ادخل العنوان
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-4 flex-column">
              <Form.Group as={Col} controlId="validationCustom04">
                <Form.Label>الايميل</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="اكتب الايميل"
                    required
                    onChange={handleChange}
                    name="vendorEmail"
                    value={formData.vendorEmail}
                    className="m-0"
                  />
                  <Form.Control.Feedback type="invalid">
                    ادخل الايميل
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-2 d-flex flex-row">
              <Form.Group className="mb-2 d-flex  flex-column justify-content-end align-items-end gap-2">
                <span className="fw-bold">نوع الترخيص</span>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Form.Label htmlFor="license1" className="mb-1">
                    سجل تجاري
                  </Form.Label>
                  <input
                    type="radio"
                    name="typeOfLicense"
                    id="license1"
                    value="سجل تجاري"
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center gap-1">
                  <Form.Label htmlFor="license2" className="mb-1">
                    وثيقة عمل حر
                  </Form.Label>
                  <input
                    type="radio"
                    name="typeOfLicense"
                    id="license2"
                    value="وثيقة عمل حر"
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="validationCustom05">
                <Form.Label>رقم السجل / الوثيقة</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="رقم السجل / الوثيقة"
                  onChange={handleChange}
                  name="licenseNumber"
                  value={formData.licenseNumber}
                />
                <Form.Control.Feedback type="invalid">
                  رقم السجل / الوثيقة
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formFileMultiple">
                <Form.Label>ارفق السجل</Form.Label>
                <Form.Control
                  required
                  type="file"
                  multiple
                  name="LicenseFile"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-2 d-flex flex-row">
              <Form.Group className="mb-2 d-flex  flex-column justify-content-end align-items-end gap-2">
                <span className="fw-bold">مسجل بالضريبة المضافة</span>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Form.Label htmlFor="tax1" className="mb-1">
                    نعم
                  </Form.Label>
                  <input
                    type="radio"
                    name="registeredWithAddedTax"
                    id="tax1"
                    value="true"
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center gap-1">
                  <Form.Label htmlFor="tax2" className="mb-1">
                    لا
                  </Form.Label>
                  <input
                    type="radio"
                    name="registeredWithAddedTax"
                    id="tax2"
                    value="false"
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom05">
                <Form.Label>الرقم الضريبي</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="الرقم الضريبي"
                />
                <Form.Control.Feedback type="invalid">
                  الرقم الضريبي
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formFileMultiple">
                <Form.Label>ارفق شهادة الضريبة</Form.Label>
                <Form.Control
                  required
                  multiple
                  type="file"
                  onChange={handleFileChange}
                  name="AddedTaxFile"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="اوافق علي الشروط و الاحكام/سياسة الخصوصية"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check required label="اوافق علي شروط و احكام البائع" />
            </Form.Group>
            <Button type="submit">تسجيل</Button>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
