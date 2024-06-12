import React, { Fragment, useState } from "react";
import "./addProduct.css";
import { FaCloudUploadAlt, FaStarOfLife } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AddProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [videoPreview, setVideoPreview] = useState(null);
  const [warranty, setWarranty] = useState(false);
  const [commission, setCommission] = useState(0);
  const [productPrice, setProductPrice] = useState(0);

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

  const handleChangeCommission = (event) => {
    setCommission(event.target.value);
  };
  const hundleSubmit = (e) => {
    e.preventDefault();
  };
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
              <form action="" onSubmit={hundleSubmit}>
                <div className="col-lg-12 mb-5">
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
                          onChange={handleVideoChange}
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
                        <div className="d-flex flex-column justify-content-center align-items-start w-100">
                          <label htmlFor="product-name" className="mb-2">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            اسم المنتج
                          </label>
                          <input
                            type="text"
                            id="product-name"
                            placeholder="اكتب اسم المنتج"
                            className=""
                            required
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start w-100">
                          <label htmlFor="product-description" className="mb-2">
                            وصف المنتج
                          </label>
                          <textarea
                            name=""
                            id="product-description"
                            placeholder="اكتب وصف المنتج"
                            className=""
                            required
                          ></textarea>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start w-100">
                          <label htmlFor="product-hashtag" className="mb-2">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            كلمات الهاشتاق #
                          </label>
                          <input
                            type="text"
                            id="product-hashtag"
                            placeholder="اكتب كلمات الهاشتاق"
                            className=""
                            required
                          />
                          <span>استخدم علامات # - ولا تستخدم المسافة</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start w-100">
                          <label htmlFor="product-hashtag" className="mb-2">
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            وزن المنتج
                          </label>
                          <input
                            type="text"
                            id="product-hashtag"
                            placeholder="اكتب وزن المنتج"
                            className=""
                            required
                          />
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
                        </div>
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
                          <label
                            htmlFor="product-warranty"
                            className="mb-2 fs-4"
                          >
                            <span className="required ms-2">
                              <FaStarOfLife />
                            </span>
                            هل يوجد ضمان علي المنتج ؟
                          </label>
                          <div className="d-flex justify-content-start gap-5 w-25">
                            <div className="d-flex gap-1 flex-row-reverse justify-content-center align-items-center">
                              <label htmlFor="warranty-yes" className="fs-4">
                                نعم
                              </label>
                              <input
                                type="radio"
                                name="warranty"
                                id="warranty-yes"
                                onChange={() => setWarranty(!warranty)}
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
                                onChange={() => setWarranty(false)}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            warranty
                              ? "warranty-options d-flex flex-column gap-3 justify-content-start align-items-start mb-5"
                              : "warranty-options-hide d-none"
                          }
                        >
                          <div className="d-flex flex-row-reverse gap-2">
                            <label htmlFor="option1">
                              ضمان ذهبي استرجاع المبلغ
                            </label>
                            <input type="checkbox" name="" id="option1" />
                          </div>
                          <div className="d-flex flex-row-reverse gap-2">
                            <label htmlFor="option2">ضمان اصلاح العطل</label>
                            <input type="checkbox" name="" id="option2" />
                          </div>
                          <div className="d-flex flex-row-reverse gap-2">
                            <label htmlFor="option3">ضمان استبدال المنتج</label>
                            <input type="checkbox" name="" id="option3" />
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
                          <div className="d-flex flex-column justify-content-center align-items-start w-100 mb-3">
                            <label
                              htmlFor="product-name"
                              className="mb-3 fw-bold"
                            >
                              <span className="required ms-2">
                                <FaStarOfLife />
                              </span>
                              سعر المنتج غير شامل الضريبة
                            </label>
                            <div>
                              <input
                                type="text"
                                id="product-name"
                                className="ms-2"
                                required
                                onChange={(e) =>
                                  setProductPrice(+e.target.value)
                                }
                              />
                              <span>ر.س</span>
                            </div>
                          </div>
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
                            <div>
                              <div className="mb-3 prod-type">
                                <select
                                  name=""
                                  id=""
                                  onChange={handleChangeCommission}
                                >
                                  {productType.map((typ) => {
                                    return (
                                      <Fragment>
                                        <option value={typ.commission}>
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
                        <div className="product-vat">
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
                      <span>5</span>
                    </div>
                  </div>
                </div>
              </form>
              <div className="col-lg-12">
                <div className="butns d-flex justify-content-between align-items-center flex-row-reverse">
                  <button
                    className={currentStep === 5 ? "next-op" : "next"}
                    onClick={() =>
                      currentStep === 5 ? null : setCurrentStep(currentStep + 1)
                    }
                    type={currentStep === 5 ? "submit" : ""}
                  >
                    {currentStep === 5 ? "اضافة" : "التالي"}
                  </button>
                  <button
                    disabled={currentStep === 1}
                    className={currentStep === 1 ? "prev-op" : "prev"}
                    onClick={() =>
                      currentStep === 1 ? null : setCurrentStep(currentStep - 1)
                    }
                  >
                    الخلف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
