import React, { Fragment, useEffect, useState } from "react";
import "./shipping.css";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  IoIosArrowBack,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShippingMethods,
  toggleShippingMethod,
  updateShippingMethodPrice,
} from "../../store/shippingSlice";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

function Shipping() {
  const dispatch = useDispatch();
  const methods = useSelector((state) => state.shipping.methods);
  const status = useSelector((state) => state.shipping.status);
  const error = useSelector((state) => state.shipping.error);

  const [comOption, setComOption] = useState(false);
  const [idToggle, setIdToggle] = useState(0);
  const [prices, setPrices] = useState({});
  const [senderPhone, setSenderPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [wieght, setWieght] = useState(15);
  const [extraWieght, setExtraWieght] = useState(1);
  const [extraPrices, setExtraPrices] = useState(2);
  const [shippingDuration, setShippingDuration] = useState(
    "من 1 يوم الي 3 يوم عمل"
  );
  const [editOrder, setEditOrder] = useState(null);

  const [activeSpan, setActiveSpan] = useState(1);
  function toggleSpan(type) {
    if (type === 1) {
      setActiveSpan(1);
    } else {
      setActiveSpan(2);
    }
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchShippingMethods());
    }
  }, [status, dispatch]);
  useEffect(() => {
    const pricesObj = {};
    methods.forEach((method) => {
      pricesObj[method.id] = method.price;
    });
    setPrices(pricesObj);
  }, [methods]);
  const handleChange = (event, id) => {
    const { value } = event.target;
    setPrices((prevPrices) => ({
      ...prevPrices,
      [id]: value,
    }));
  };

  const handleSave = (id, com) => {
    dispatch(updateShippingMethodPrice({ id, price: prices[id] }));
    axios({
      method: "put",
      url: `http://localhost:9000/shipping-methods/${id}`,
      data: {
        ...com,
        wight: wieght,
        extraPrice: extraPrices,
        extraWieght: extraWieght,
        shippingDuration: shippingDuration,
        storeName: storeName,
        senderName: senderName,
        senderPhone: senderPhone,
        price: prices[id],
      },
    }).then((data) => {
      toast.success("تم تعديل البيانات", {
        position: "top-left",
      });
    });
    setComOption((comOption) => !comOption);
  };

  const handleToggle = (id) => {
    dispatch(toggleShippingMethod(id));
  };

  function handleAlert() {
    Swal.fire({
      html: "<div class=alert-weight><p>الوزن الحجمي في الشحن وطريقة حسابه</p><p>ما هو الوزن الحجمي للطرد؟ </p><p>الوزن الحجمي: هو وزن الطرد الذي يحسب من حجمه أو أبعاده. إنها المساحة التي يشغلها الصندوق من حيث كثافته.</p><p>طريقة حساب الوزن الحجمي للطرد:</p><ol><li> قياس أبعاد الشحنة/الطرد بـالـ (سم).</li><li>حجم الشحنة=الطول × العرض × الإرتفاع</li><li>قسم حجم الشحنة على العامل الحجمي.</li></ol><p> العامل الحجمي للشحن البري= 6000</p></div>",
      icon: "info",
    });
  }

  return (
    <div className="main-shipping">
      <div className="logo mb-3">
        <img src={logo} alt="" className="logo w-100" />
      </div>
      <div className="back">
        <Link
          to="/profile"
          className="d-flex flex-row-reverse align-items-center text-dark pe-1 text-black-50 fs-6 mb-3"
        >
          <IoIosArrowRoundForward />
          <span>الرجوع الي الحساب</span>
        </Link>
      </div>
      <div className="shipping-method">
        {methods.map((com) => {
          return (
            <Fragment>
              <div className="shipping-company" key={com.id}>
                <div
                  className="image"
                  onClick={() => {
                    setComOption((comOption) => !comOption);
                    setIdToggle(com.id);
                  }}
                >
                  <img src={com.image} alt="" srcset="" />
                </div>
                <div
                  className="name"
                  onClick={() => {
                    setComOption((comOption) => !comOption);
                    setIdToggle(com.id);
                  }}
                >
                  <p className="m-0">{com.name}</p>
                </div>
                <div className="d-flex justify-content-center align-items-center sw-togg">
                  <IoIosArrowBack
                    className="me-3 fw-bold"
                    onClick={() => {
                      setComOption((comOption) => !comOption);
                      setIdToggle(com.id);
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={com.enabled}
                        onChange={() => handleToggle(com.id)}
                      />
                    }
                    label={com.enabled ? "الغاء التفعيل" : "تفعيل"}
                  />
                </div>
              </div>

              <div
                className={
                  comOption && idToggle === com.id
                    ? "com-option"
                    : "com-option-hide"
                }
              >
                <div className="container">
                  <div className="close">
                    <IoIosCloseCircleOutline
                      onClick={() => {
                        setComOption((comOption) => !comOption);
                        setActiveSpan(1);
                      }}
                    />
                    <p className="m-0">{com.name}</p>
                  </div>
                  <div className="option-nav d-flex justify-content-end">
                    <span
                      className={activeSpan === 2 ? "active" : ""}
                      onClick={() => toggleSpan(2)}
                    >
                      بيانات المرسل
                    </span>
                    <span
                      className={activeSpan === 1 ? "active" : ""}
                      onClick={() => toggleSpan(1)}
                    >
                      تسعيرة الشحن
                    </span>
                  </div>
                  <div
                    className={
                      activeSpan === 1 ? "co-content" : "co-content-hide"
                    }
                  >
                    <div className="p-3 price-vendor">
                      <h5 className="mb-3">تكلفة الشحن للتاجر</h5>
                      <div className="d-flex gap-3 align-items-center">
                        <p className="m-0">27.6 ر.س</p>
                        <p className="m-0 info-ship d-flex flex-wrap align-items-center justify-content-center text-black-50">
                          لاول 25 كجم حسب (الوزن الفعلي او الحجمي ايهما اكبر).
                          <span className="ms-2 me-2">
                            {" "}
                            2 ر.س لكل كجم اضافي
                          </span>
                          <Link onClick={() => handleAlert()}>تفاصيل</Link>
                        </p>
                      </div>
                    </div>
                    <form>
                      <div key={com.id} className="p-3 d-flex flex-column">
                        <h5 className="mb-3">رسوم الشحن للعميل</h5>
                        <div className="d-flex justify-content-start align-items-start flex-column gap-3">
                          <div className="d-flex gap-3 align-items-center">
                            <div className="d-flex align-items-center gap-2">
                              <TextField
                                label={com.name}
                                type="number"
                                value={prices[com.id]}
                                onChange={(e) => handleChange(e, com.id)}
                              />
                              <span>ر.س</span>
                            </div>
                            <span className="text-black-50">لاول</span>
                            <div className="d-flex align-items-center gap-2">
                              <TextField
                                label={"الوزن"}
                                type="number"
                                value={wieght}
                                name="wight"
                                onChange={(e) => {
                                  setWieght(e.target.value);
                                }}
                              />
                              <span>كجم</span>
                            </div>
                          </div>
                          <h6>تكلفة الزيادة</h6>
                          <div className="d-flex gap-3 align-items-center">
                            <div className="d-flex align-items-center gap-2">
                              <TextField
                                label={"السعر"}
                                type="number"
                                value={extraPrices}
                                name="extraPrice"
                                onChange={(e) => {
                                  setExtraPrices(e.target.value);
                                }}
                              />
                              <span>ر.س</span>
                            </div>
                            <span className="text-black-50">لكل</span>
                            <div className="d-flex align-items-center gap-2">
                              <TextField
                                label={"الوزن"}
                                type="number"
                                name="extraWieght"
                                value={extraWieght}
                                onChange={(e) => {
                                  setExtraWieght(e.target.value);
                                }}
                              />
                              <span>كجم</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-start flex-column gap-2">
                            <span>مدة الشحن</span>
                            <select
                              name=""
                              id=""
                              onChange={(e) => {
                                setShippingDuration(e.target.value);
                              }}
                            >
                              <option value="">اختر</option>
                              <option value="من 2 الي 8 يوم عمل">
                                من 2 الي 8 يوم عمل
                              </option>
                              <option value="من 8 الي 15 يوم عمل">
                                من 8 الي 15 يوم عمل
                              </option>
                              <option value="من 15 الي 30 يوم عمل">
                                من 15 الي 30 يوم عمل
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="summry d-flex justify-content-center align-items-center flex-column mt-3 mb-3">
                          <h5>مخلص التسعيرة</h5>
                          <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                            <span>تكلفة الشحن {prices[com.id]} ر.س</span>
                            <IoIosArrowRoundBack />
                            <span>لاول {wieght} كجم</span>
                          </div>
                          <div className="d-flex justify-content-center align-items-center gap-3">
                            <span>تكلفة الزيادة {extraPrices} ر.س</span>
                            <IoIosArrowRoundBack />
                            <span>لكل {extraWieght} كجم اضافي</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className={
                      activeSpan === 2
                        ? "co-show-policy p-3"
                        : "co-show-policy-hide"
                    }
                  >
                    <h4 className="mb-3">بيانات المرسل </h4>
                    <div className="form-groub d-flex flex-column gap-3 align-items-start justify-content-center">
                      <div className="d-flex flex-column gap-1 align-items-start justify-content-center">
                        <label htmlFor="">اسم المتجر</label>
                        <input
                          name="storeName"
                          type="text"
                          placeholder="اسم المتجر في البوليصة"
                          onChange={(e) => setStoreName(e.target.value)}
                        />
                      </div>
                      <div className="d-flex flex-column gap-1 align-items-start justify-content-center">
                        <label htmlFor="">اسم المرسل</label>
                        <input
                          name="senderName"
                          type="text"
                          placeholder="اسم المرسل في البوليصة"
                          onChange={(e) => setSenderName(e.target.value)}
                        />
                      </div>
                      <div className="d-flex flex-column gap-1 align-items-start justify-content-center">
                        <label htmlFor="">رقم الجوال</label>
                        <input
                          name="senderPhone"
                          type="text"
                          minLength="10"
                          maxLength="10"
                          placeholder="رقم الجوال"
                          onChange={(e) => setSenderPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSave(com.id, com)}
                    class="btn-24 me-auto ms-auto"
                  >
                    <span>حفظ</span>
                  </Button>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Shipping;
