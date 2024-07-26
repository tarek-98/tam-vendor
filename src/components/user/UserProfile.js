import React, { useEffect, useState } from "react";
import "./userProfile.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCarAlt,
  FaCartPlus,
  FaInfo,
  FaRegEdit,
  FaShoppingCart,
  FaWindowRestore,
} from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { TbReportSearch } from "react-icons/tb";
import { IoCloudUploadSharp } from "react-icons/io5";
import {
  IoIosGift,
  IoMdCloseCircle,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { FaUserEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import logo1 from "../../assets/images/logo1.png";
import { MdOutlineMoveToInbox } from "react-icons/md";
import {
  logout,
  registerUser,
  sendLoginCode,
  setIsAuthenticated,
} from "../../store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import LoginSucess from "../login/LoginSucess";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  /*edit info vendor*/
  const [vendorEmail, setVendorEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorLocation, setvendorLocation] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [typeOfLicense, setTypeOfLicense] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseFile, setLicenseFile] = useState("");
  const [registeredWithAddedTax, setRegisteredWithAddedTax] = useState("");
  const [addedTaxFile, setAddedTaxFile] = useState("");
  const { isAuthenticated, error, vendorInfo, status } = useSelector(
    (state) => state.auth
  );

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      navigate("/verify-email");
    }
    dispatch(
      registerUser({
        vendorEmail,
        brandName,
        vendorName,
        vendorLocation,
        vendorPhone,
        typeOfLicense,
        licenseNumber,
        licenseFile,
        registeredWithAddedTax,
        addedTaxFile,
      })
    );
    dispatch(sendLoginCode(vendorEmail));
    setValidated(true);
  };
  /* */
  useEffect(() => {
    console.log(vendorInfo.data._id);
    console.log(vendorInfo.data);
  }, []);
  useEffect(() => {
    document.title = "حسابي";
  }, []);

  function refresh() {
    dispatch(setIsAuthenticated(false));
    //dispatch(logout()); not working
    navigate("/login");
    console.log(isAuthenticated);
  }
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // if (vendorInfo.data.status === "pending" && isAuthenticated) {
  //   return <LoginSucess />;
  // }

  return (
    <div className="user-profile">
      <div className="container">
        <div className="user-content">
          <div className="sign-up mb-4">
            <div className="close-mob" onClick={() => refresh()}>
              <IoMdCloseCircle className="fs-5" />
            </div>
            <div className="close" onClick={() => refresh()}>
              <IoMdCloseCircle className="fs-5" />
            </div>
            <div className="user-icon">
              <div className="image ms-3">
                <img
                  src={
                    vendorInfo.data.logo === undefined
                      ? logo1
                      : vendorInfo.data.logo
                  }
                  alt=""
                />
              </div>
              <div className="user-name d-flex">
                <div className="d-flex flex-row-reverse">
                  <span className="ms-1">{vendorInfo.data.vendorName}</span>
                </div>
                <div className="user-ph text-center mb-2">
                  <span className="text-dark">{vendorInfo.data.status}</span>
                </div>
                <div className="edit-logo d-flex gap-4 text-center">
                  <Link onClick={toggleModal}>
                    <FaRegEdit className="text-dark me-1" />
                    تعديل البيانات
                  </Link>
                  <Link to="/profile/editlogo">
                    <FaRegEdit className="text-dark me-1" />
                    تغيير اللوجو
                  </Link>
                </div>
                <div className="export-bill profile-edit">
                  <div className={`modal-overlay ${isOpen ? "open z-3" : ""}`}>
                    <div className={`modal-change ${isOpen ? "open" : ""}`}>
                      <div className="close-edit mb-3" onClick={toggleModal}>
                        <IoMdCloseCircleOutline className="fs-3" />
                      </div>
                      <div className="ps-1 pe-1">
                        <div className="d-flex justify-content-between align-items-center flex-row-reverse mb-3">
                          <span className="fs-5">تعديل البيانات</span>
                        </div>
                        <div className="form">
                          <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                          >
                            <Row className="mb-3 flex-column">
                              <Form.Group
                                as={Col}
                                controlId="validationCustom01"
                              >
                                <Form.Label>اسم المتجر</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="اكتب اسم المتجر"
                                  onChange={(e) => setBrandName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                  ادخل اسم المتجر
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="validationCustomUsername"
                              >
                                <Form.Label>مقر البائع</Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    placeholder="اكتب مقر البائع"
                                    required
                                    onChange={(e) =>
                                      setvendorLocation(e.target.value)
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    ادخل العنوان
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </Row>
                            <Row className="mb-2 d-flex flex-row">
                              <Form.Group className="mb-1 d-flex flex-row justify-content-start gap-4">
                                <span className="fw-bold">نوع الترخيص</span>
                                <div className="d-flex flex-row-reverse align-items-center justify-content-center gap-2">
                                  <Form.Label
                                    htmlFor="license1"
                                    className="mb-1"
                                  >
                                    سجل تجاري
                                  </Form.Label>
                                  <input
                                    type="radio"
                                    name="license"
                                    id="license1"
                                    value="سجل تجاري"
                                    onChange={(e) =>
                                      setTypeOfLicense(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="d-flex flex-row-reverse align-items-center justify-content-center gap-1">
                                  <Form.Label
                                    htmlFor="license2"
                                    className="mb-1"
                                  >
                                    وثيقة عمل حر
                                  </Form.Label>
                                  <input
                                    type="radio"
                                    name="license"
                                    id="license2"
                                    value="وثيقة عمل حر"
                                    onChange={(e) =>
                                      setTypeOfLicense(e.target.value)
                                    }
                                  />
                                </div>
                              </Form.Group>
                            </Row>
                            <Row className="mb-4 input-file">
                              <Form.Group
                                as={Col}
                                controlId="validationCustom05"
                              >
                                <Form.Label>رقم السجل / الوثيقة</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="رقم السجل / الوثيقة"
                                  onChange={(e) =>
                                    setLicenseNumber(e.target.value)
                                  }
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
                                  onChange={(e) =>
                                    setLicenseFile(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Row>
                            <Row className="mb-2 d-flex flex-row input-file">
                              <Form.Group className="mb-1 d-flex flex-row justify-content-start gap-4">
                                <span className="fw-bold">
                                  مسجل بالضريبة المضافة
                                </span>
                                <div className="d-flex flex-row-reverse align-items-center justify-content-center gap-2">
                                  <Form.Label htmlFor="tax1" className="mb-1">
                                    نعم
                                  </Form.Label>
                                  <input
                                    type="radio"
                                    name="tax"
                                    id="tax1"
                                    value="true"
                                    onChange={(e) =>
                                      setRegisteredWithAddedTax(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="d-flex flex-row-reverse align-items-center justify-content-center gap-1">
                                  <Form.Label htmlFor="tax2" className="mb-1">
                                    لا
                                  </Form.Label>
                                  <input
                                    type="radio"
                                    name="tax"
                                    id="tax2"
                                    value="false"
                                    onChange={(e) =>
                                      setRegisteredWithAddedTax(e.target.value)
                                    }
                                  />
                                </div>
                              </Form.Group>
                            </Row>
                            <Row className="mb-3 input-file">
                              <Form.Group
                                as={Col}
                                controlId="validationCustom05"
                              >
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
                                  type="file"
                                  onChange={(e) =>
                                    setAddedTaxFile(e.target.value)
                                  }
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
                              <Form.Check
                                required
                                label="اوافق علي شروط و احكام البائع"
                              />
                            </Form.Group>
                            <Button type="submit">تعديل</Button>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ToastContainer />
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
              <Link className="user-item d-flex w-100">
                <TbReportSearch />
                <span>تقارير المبيعات</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link
                className="user-item d-flex w-100"
                to="/profile/incomereport"
              >
                <TbReportSearch />
                <span>تقارير الدخل</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/coupons">
                <IoIosGift />
                <span>اضافة كوبون</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/bocket">
                <IoIosGift />
                <span>المحفظة</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/shipping">
                <FaCarAlt />
                <span>خدمات الشحن و التوصيل</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="/profile/payments">
                <CiCreditCard1 />
                <span>خدمات تابي و تمارا </span>
              </Link>
            </div>
            <div className="user-option-item inbox-pc">
              <Link className="user-item d-flex w-100" to="/profile/inbox">
                <MdOutlineMoveToInbox className="tab-icon" />
                <span>صندوق الوارد</span>
              </Link>
            </div>
            <div className="user-option-item inbox-pc">
              <Link className="user-item d-flex w-100" to="/profile/review">
                <MdOutlineMoveToInbox className="tab-icon" />
                <span>تقيماتي</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="">
                <IoCloudUploadSharp />
                <span className="col-rd text-danger">NEW</span>
                <span>طلب اعلان خاص</span>
              </Link>
            </div>
            <div className="user-option-item">
              <Link className="user-item d-flex w-100" to="">
                <FaInfo />
                <span>شروحات الاستخدام</span>
              </Link>
            </div>
            <div className="user-option-item item-pc">
              <Link className="user-item d-flex w-100">
                <FaWindowRestore />
                <span>سياسة الشحن و الاسترجاع</span>
              </Link>
            </div>
            <div className="user-option-item item-pc">
              <Link className="user-item d-flex w-100">
                <FaWindowRestore />
                <span>الشروط و الاحكام و سياسة الخصوصية</span>
              </Link>
            </div>
            <div className="user-option-item item-pc">
              <Link className="user-item d-flex w-100">
                <span>TMGGL</span>
                <span>عن تمقل</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
