import React, { Fragment, useEffect, useState } from "react";
import "./addProduct.css";
import { FaCloudUploadAlt, FaPlus, FaStarOfLife } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast, ToastContainer } from "react-toastify";
import { addChoose, addProduct } from "../../store/addProductSlice";
import { Button } from "react-bootstrap";
import AddChoose from "./AddChoose";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendorInfo } = useSelector((state) => state.auth);
  const { newProduct, status } = useSelector((state) => state.addProduct);
  const id = vendorInfo && vendorInfo.data._id;
  const productId =
    status === "product Added" || status === "chooseAdded"
      ? newProduct && newProduct.data._id
      : null;
  const [validated, setValidated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [videoPreview, setVideoPreview] = useState(null);
  const [warrantyPop, setWarrantyPop] = useState(false);
  const [optionsPop, setOptionsPop] = useState(true);
  const [optionsMenu, setOptionsMenu] = useState(false);
  const [commission, setCommission] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    hashtag: "",
    img: null,
    video: null,
    warranty: "",
    typeWarranty: "",
    therearechooses: "",
  });

  const handleChangeCommission = (event) => {
    setCommission(event.target.value);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (formData.name === "") {
      toast.error("اسم المنتج مطلوب", {
        position: "top-left",
      });
      return false;
    } else if (formData.therearechooses === "") {
      toast.error("تحديد خيارات المنتج", {
        position: "top-left",
      });
      return false;
    } else if (formData.hashtag === "") {
      toast.error("الهاشتاج مطلوب", {
        position: "top-left",
      });
      return false;
    } else if (formData.price === "") {
      toast.error("سعر المنتج مطلوب", {
        position: "top-left",
      });
      return false;
    } else if (formData.video === null) {
      toast.error("فيديو المنتج مطلوب", {
        position: "top-left",
      });
      return false;
    } else if (formData.img === null) {
      toast.error("صورة المنتج مطلوبة", {
        position: "top-left",
      });
      return false;
    } else if (formData.warranty === "") {
      toast.error("تحديد الضمان", {
        position: "top-left",
      });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  function handleSave() {
    if (validateForm()) {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });
      dispatch(addProduct({ id, productData: formDataObj }));
      setOptionsMenu(true);
      setSaved(true);
      console.log(id);
      console.log(formDataObj);
      console.log(formData);
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      validateForm();
    } else {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });
      dispatch(addProduct({ id, productData: formDataObj }));
      event.preventDefault();
      console.log(id);
      console.log(formDataObj);
      console.log(formData);
    }
    setValidated(true);
    event.preventDefault();
    if (status === "succeeded") {
      navigate("/profile");
    }
  };

  function handelNavigate() {
    if (saved) {
      navigate("/profile");
    } else {
      handleSave();
    }
  }

  const steps = ["1", "2", "3", "4", "5"];
  const productType = [
    { name: "اختر ", commission: 0 },
    { name: "ملابس", commission: 10 },
    { name: "الكترونيات", commission: 20 },
    { name: "اجهزة كهربائية", commission: 5 },
    { name: "العاب", commission: 15 },
    { name: "ملابس رياضية", commission: 25 },
  ];

  function handleAlert() {
    Swal.fire({
      html: "<div class=alert-weight><p>الوزن الحجمي في الشحن وطريقة حسابه</p><p>ما هو الوزن الحجمي للطرد؟ </p><p>الوزن الحجمي: هو وزن الطرد الذي يحسب من حجمه أو أبعاده. إنها المساحة التي يشغلها الصندوق من حيث كثافته.</p><p>طريقة حساب الوزن الحجمي للطرد:</p><ol><li> قياس أبعاد الشحنة/الطرد بـالـ (سم).</li><li>حجم الشحنة=الطول × العرض × الإرتفاع</li><li>قسم حجم الشحنة على العامل الحجمي.</li></ol><p> العامل الحجمي للشحن البري= 6000</p></div>",
      icon: "info",
    });
  }

  return (
    <div className="user-profile">
      <div className="container">
        <div className="row">
          <div className="add-product-content">
            <div className="col-lg-12 mb-4">
              <div className="d-flex justify-content-center align-items-center">
                <h4>اضافة منتج</h4>
              </div>
            </div>
            <div className="col-lg-12 mb-5">
              <div className="steps d-flex justify-content-between align-items-center flex-row-reverse">
                {steps.map((step, idx) => {
                  return (
                    <div
                      id={`stp${idx + 1}`}
                      key={idx}
                      className={
                        currentStep >= idx + 1 ? "step active" : "step"
                      }
                      onClick={() => setCurrentStep(idx + 1)}
                    >
                      <span>
                        {currentStep > idx + 1 ? (
                          <IoIosCheckmark className="fs-4 text-light fw-bold" />
                        ) : (
                          step
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="form">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="col-lg-12 mb-5">
                  <div className="steps-content d-flex justify-content-between align-items-center">
                    <div
                      className={
                        currentStep === 1
                          ? "step-content-item w-100"
                          : "step-content-item-hide"
                      }
                    >
                      <div className="form-group">
                        <label
                          htmlFor="video-input"
                          className="video-label d-flex justify-content-center align-items-center"
                        >
                          {videoPreview ? (
                            <video src={videoPreview} controls muted autoPlay />
                          ) : (
                            <span className="fw-blod fs-4">
                              اضغط لاضافة الفيديو
                            </span>
                          )}
                        </label>
                        <input
                          id="video-input"
                          type="file"
                          accept="video/*"
                          name="video"
                          onChange={(e) => {
                            handleChange(e);
                            handleVideoChange(e);
                          }}
                        />
                        <div className="video-text d-flex align-items-center mb-2 pe-3">
                          <span className="required ms-2">
                            <FaStarOfLife />
                          </span>
                          <span className="ms-2 fs-4">اضف الفيديو </span>
                          <FaCloudUploadAlt className="fs-4" />
                        </div>
                        <div className="video-text align-items-center pe-3">
                          <p className="mb-1 fw-bold">شروط قبول الفيديو</p>
                          <ul>
                            <li>مدة الفيديو لا تتجاوز 50 ثانية</li>
                            <li>عدم وجود علامات مائية لمواقع اخري</li>
                            <li>توضيح المنتج بشكل جيد</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        currentStep === 2
                          ? "step-content-item"
                          : "step-content-item-hide"
                      }
                    >
                      <div className="form-group product-details d-flex flex-column gap-5 justify-content-center align-items-start w-100">
                        <Form.Group
                          as={Col}
                          controlId="validationCustom02"
                          className="d-flex flex-column justify-content-center align-items-start w-100"
                        >
                          <Form.Label className="mb-2">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            اسم المنتج
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="اكتب اسم المنتج"
                            className=""
                            required
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            ادخل اسم المنتج
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          controlId="validationCustom03"
                          className="d-flex flex-column justify-content-center align-items-start w-100"
                        >
                          <Form.Label className="mb-2">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            وصف المنتج
                          </Form.Label>
                          <Form.Control
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            as="textarea"
                            placeholder="اكتب وصف المنتج"
                            className=""
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            ادخل وصف المنتج
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          controlId="validationCustom04"
                          className="d-flex flex-column justify-content-center align-items-start w-100"
                        >
                          <Form.Label className="mb-2">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            كلمات الهاشتاق #
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="اكتب كلمات الهاشتاق"
                            className=""
                            name="hashtag"
                            value={formData.hashtag}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            ادخل الهاشتاق
                          </Form.Control.Feedback>
                          <span>استخدم علامات # - ولا تستخدم المسافة</span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          controlId="validationCustom05"
                          className="d-flex flex-column justify-content-center align-items-start w-100"
                        >
                          <Form.Label className="mb-2">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            وزن المنتج
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="اكتب وزن المنتج"
                            className=""
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            ادخل تفاصيل المنتج
                          </Form.Control.Feedback>
                          <span className="text-black-50 d-flex">
                            أدخل الوزن الفعلي للمنتج ليتم معالجته بشكل صحيح من
                            قبل شركة الشحن، وفي حال كانت منتجاتك ذات حجم كبير
                            الرجاء الانتباه للوزن الحجمي
                            <Link
                              className="ms-2 me-2"
                              onClick={() => handleAlert()}
                            >
                              تفاصيل
                            </Link>
                          </span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          controlId="validationCustom06"
                          className="d-flex flex-column justify-content-center align-items-start w-100"
                        >
                          <Form.Label className="mb-2">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            صورة المنتج الاساسية
                          </Form.Label>
                          <input
                            type="file"
                            placeholder="اكتب كلمات الهاشتاق"
                            className="input-img-edit"
                            name="img"
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            ادخل صورة المنتج الاساسية
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                    <div
                      className={
                        currentStep === 3
                          ? "step-content-item"
                          : "step-content-item-hide"
                      }
                    >
                      <div className="form-group">
                        <div className="mb-4">
                          <span className="fs-4">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            هل يوجد ضمان علي المنتج ؟
                          </span>
                          <div className="d-flex justify-content-start gap-5 w-25 mt-3">
                            <div className="d-flex gap-1 flex-row-reverse justify-content-center align-items-center">
                              <label htmlFor="warranty-yes" className="fs-4">
                                نعم
                              </label>
                              <input
                                type="radio"
                                name="warranty"
                                value={true}
                                id="warranty-yes"
                                onChange={(e) => {
                                  setWarrantyPop(!warrantyPop);
                                  handleChange(e);
                                }}
                              />
                            </div>
                            <div className="d-flex gap-1 flex-row-reverse">
                              <label htmlFor="warranty-no" className="fs-4">
                                لا
                              </label>
                              <input
                                type="radio"
                                name="warranty"
                                id="warranty-no"
                                value={false}
                                onChange={(e) => {
                                  setWarrantyPop(false);
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            warrantyPop
                              ? "warranty-options d-flex flex-column gap-3 justify-content-start align-items-start mb-5"
                              : "warranty-options-hide d-none"
                          }
                        >
                          <div className="d-flex flex-row-reverse gap-2">
                            <label htmlFor="option1">
                              ضمان ذهبي استرجاع المبلغ
                            </label>
                            <input
                              type="checkbox"
                              name="typeWarranty"
                              value="returnMoney"
                              onChange={handleChange}
                              id="option1"
                            />
                          </div>
                          <div className="d-flex flex-row-reverse gap-2">
                            <label htmlFor="option2">ضمان اصلاح العطل</label>
                            <input
                              type="checkbox"
                              name="typeWarranty"
                              value="fix"
                              onChange={handleChange}
                              id="option2"
                            />
                          </div>
                          <div className="d-flex flex-row-reverse gap-2">
                            <label htmlFor="option3">ضمان استبدال المنتج</label>
                            <input
                              type="checkbox"
                              name="typeWarranty"
                              value="replacement"
                              onChange={handleChange}
                              id="option3"
                            />
                          </div>
                        </div>
                        <div>
                          <p>
                            المنتجات الالكترونية و الكهربائية يجب ان تقدم بضمان
                            حسب ما تنص عليه وزارة التجارة
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        currentStep === 4
                          ? "step-content-item"
                          : "step-content-item-hide"
                      }
                    >
                      <div className="form-group">
                        <div className="product-price mb-3">
                          <Form.Group
                            as={Col}
                            controlId="validationCustom07"
                            className="d-flex flex-column justify-content-center align-items-start w-100 mb-3"
                          >
                            <Form.Label className="mb-3 fw-bold">
                              <span className="required ms-2">
                                <FaStarOfLife />
                              </span>
                              سعر المنتج غير شامل الضريبة
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="price"
                              value={formData.price}
                              placeholder="ادخل سعر المنتج"
                              className="ms-2 w-25"
                              required
                              onChange={(e) => {
                                setProductPrice(+e.target.value);
                                handleChange(e);
                              }}
                            />
                            <span>ر.س</span>
                            <Form.Control.Feedback type="invalid">
                              ادخل سعر المنتج
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="product-commission">
                          <div className="d-flex flex-column justify-content-center align-items-start w-100 mb-3">
                            <label
                              htmlFor="product-name"
                              className="mb-3 fw-bold"
                            >
                              <span className="required ms-2">
                                <FaStarOfLife />
                              </span>
                              اختر نوع المنتج
                            </label>
                            <div className="prod-type-item">
                              <div className="mb-3 prod-type">
                                <select
                                  name=""
                                  id=""
                                  onChange={handleChangeCommission}
                                >
                                  {productType.map((typ) => {
                                    return (
                                      <Fragment>
                                        <option
                                          value={typ.commission}
                                          key={typ.commission}
                                        >
                                          {typ.name}
                                        </option>
                                      </Fragment>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="d-flex flex-column justify-content-center align-items-start w-100">
                                <p className="fw-bold">عمولة تمقل</p>
                                <p className="priceCommis">
                                  {productPrice.toFixed(2) *
                                    (commission / 100).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-vat prod-type-item">
                          <div className="d-flex flex-column justify-content-center align-items-start w-100">
                            <p className="fw-bold">
                              السعر الظاهر للعميل (شامل الضريبة)
                            </p>
                            <p className="priceVat">
                              {productPrice * (15 / 100) + productPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        currentStep === 5
                          ? "step-content-item"
                          : "step-content-item-hide"
                      }
                    >
                      <div className="form-group">
                        <div className="mb-4">
                          <label
                            htmlFor="product-warranty"
                            className="mb-3 fs-4"
                          >
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            هل يوجد خيارات للمنتج؟
                          </label>
                          <div className="d-flex justify-content-start gap-5">
                            <div className="d-flex gap-1 flex-row-reverse justify-content-center align-items-center">
                              <label htmlFor="chooise-yes" className="fs-4">
                                نعم
                              </label>
                              <input
                                type="radio"
                                name="therearechooses"
                                value={true}
                                id="chooise-yes"
                                onChange={(e) => {
                                  handleChange(e);
                                  setOptionsPop(!optionsPop);
                                }}
                              />
                            </div>
                            <div className="d-flex gap-1 flex-row-reverse">
                              <label htmlFor="chooise-no" className="fs-4">
                                لا
                              </label>
                              <input
                                type="radio"
                                name="therearechooses"
                                id="chooise-no"
                                value={false}
                                onChange={(e) => {
                                  handleChange(e);
                                  setOptionsPop(true);
                                  setOptionsMenu(false);
                                }}
                              />
                            </div>
                            <Button
                              variant="primary"
                              className="p-2 d-flex align-items-center justify-content-center"
                              disabled={optionsPop}
                              onClick={() => handleSave()}
                            >
                              <FaPlus className="ms-2" />
                              <span>اضافة خيار</span>
                            </Button>
                          </div>
                        </div>
                        <AddChoose
                          productId={productId}
                          optionsMenu={optionsMenu}
                        />
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="col-lg-12">
                  {optionsPop ? (
                    <div className="butns d-flex justify-content-between align-items-center flex-row-reverse">
                      {currentStep === 5 && (
                        <button className="next" type="submit">
                          اضافة
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="butns d-flex justify-content-between align-items-center flex-row-reverse">
                      {currentStep === 5 && (
                        <button
                          className="next"
                          onClick={() => handelNavigate()}
                        >
                          حفظ
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddProduct;
