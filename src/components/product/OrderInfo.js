import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchSingleOrder, getSingleOrder } from "../../store/ordersSlice";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward, IoMdCloseCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaShippingFast } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { fetchWalletData, makeTransaction } from "../../store/walletSlice";
import { Table } from "react-bootstrap";

function OrderInfo() {
  const { id } = useParams();
  const order = useSelector(getSingleOrder);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStatue, setIsOpenStatue] = useState(false);
  const [numBoxs, setNumBoxs] = useState(0);
  const [orderStatue, setOrderStatue] = useState("");
  const [editOrder, setEditOrder] = useState(null);
  const wallet = useSelector((state) => state.wallet);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleModalStatue = () => {
    setIsOpenStatue(!isOpenStatue);
  };

  const handleChangeNumBoxs = (event) => {
    setNumBoxs(event.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleOrder(id));
    dispatch(fetchWalletData());
  }, []);

  const validateForm = () => {
    if (orderStatue === "") {
      toast.error("حالة الطلب مطلوبة", {
        position: "top-left",
      });
      return false;
    }
    return true;
  };
  const formSubmet = () => {
    if (validateForm()) {
      axios
        .put(`http://localhost:9000/orders/${id}`, editOrder)
        .then((response) => {
          toast.success("تم تعديل الحالة", {
            position: "top-left",
          });
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditOrder({ ...order, [name]: value });
    setOrderStatue(e.target.value);
  };

  function refresh() {
    if (orderStatue) {
      setIsOpenStatue(!isOpenStatue);
    }
    setTimeout(() => {
      if (orderStatue) {
        window.location.reload();
      }
    }, 1000);
  }
  const handleTransaction = async () => {
    try {
      // Simulate transaction API call (replace with actual API endpoint)
      const response = await axios.post(
        "http://localhost:9000/wallet/transactions",
        { description: "اصدار بوليصة", amount: "26.7" }
      );

      // Dispatch action to update balance in Redux store
      dispatch(makeTransaction(response.data));
    } catch (error) {
      console.error("Error making transaction:", error);
    }
  };
  function checkBlance() {
    if (wallet.balance === 0) {
      toast.error("رصيد المحفظة لا يسمح", {
        position: "top-left",
      });
    } else {
      handleTransaction();
      toast.success("تم اصدار البوليصة", {
        position: "top-left",
      });
      toggleModal();
    }
  }

  return (
    <div className="vendor-orders-info">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-2">
            <div className="back">
              <Link
                to="/profile/orderslist"
                className="d-flex flex-row-reverse align-items-center text-dark pe-1 text-black-50 fs-6 mb-3"
              >
                <IoIosArrowRoundForward />
                <span>الرجوع الي الطلبات</span>
              </Link>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12 mb-5">
                <div className="order-details d-flex justify-content-between align-items-center p-4">
                  <div className="text-center">
                    <h6># رقم الطلب</h6>
                    <span className="fw-bold">{order.id}</span>
                  </div>
                  <div className="text-center">
                    <h6>تاريخ الطلب</h6>
                    <span>{order.order_date}</span>
                  </div>
                  <div className="text-center">
                    <h6>حالة الطلب</h6>
                    <span className="ord-st" onClick={toggleModalStatue}>
                      {order.shipping_status}
                      <CiEdit />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-5">
                <div className="order-info-user d-flex justify-content-between align-items-center">
                  <div className="order-info-user-name">
                    <div className="item-name p-3">
                      <span>العميل</span>
                    </div>
                    <div className="item-details p-3">
                      <span className="fs-4">{order.name}</span>
                      <div className="user-phone d-flex flex-column gap-4">
                        <span className="ms-2 fs-4 text-black-50">
                          {order.phone}
                        </span>
                        <div className="d-flex justify-content-end gap-3">
                          <a href={`tel:${order.phone}`}>اتصال</a>
                          <Link className="me-1">مراسلة</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-info-user-shipping ">
                    <div className="item-name p-3 d-flex justify-content-between">
                      <span>الشحن</span>
                      <span className="ship-bill" onClick={toggleModal}>
                        <FaShippingFast className="ms-1" /> اصدار البوليصة
                      </span>
                    </div>
                    <div className="item-details p-3">
                      <span>شركة الشحن</span>
                      <div className="user-address d-flex">
                        <span className="ms-2 text-black-50">العنوان</span>
                      </div>
                      <div>
                        <hr />
                        <div className=" d-flex justify-content-between align-items-center mb-1">
                          <span>
                            بوليصة الشحن : <span className="me-1">458766</span>
                          </span>
                          <span className="ship-bill">طباعة</span>
                        </div>
                        <div className="mb-2">
                          <span>
                            رقم المراجعة : <span>541568</span>
                          </span>
                        </div>
                        <div className="mb-1">
                          <span className="ship-bill">تتبع حالة الشحنة</span>
                        </div>
                        <hr />
                        <div className="return-bill">
                          <span>اصدار بوليصة ارجاع</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-info-user-payment">
                    <div className="item-name p-3 d-flex justify-content-between align-items-center">
                      <span>الدفع</span>
                      <span className="payment-bill">
                        <TbFileInvoice /> اصدار الفاتورة
                      </span>
                    </div>
                    <div className="item-details p-3">
                      <IoCheckmarkCircleOutline className="ms-2 fs-4" />
                      <span className="fs-4">تم الدفع عن طريق (......)</span>
                    </div>
                  </div>
                  <div className="order-info-user-payment">
                    <div className="item-name p-3 d-flex justify-content-between align-items-center">
                      <span>الملخص</span>
                      <span className="payment-bill">
                        <TbFileInvoice /> ارسال الفاتورة
                      </span>
                    </div>
                    <div className="item-details p-3 d-flex flex-column">
                      <span className="fs-4">
                        الاجمالي
                        <span>{order.total_amount}</span>
                      </span>
                      <span className="fs-4">العمولة</span>
                      <span className="fs-4">المستحق للتاجر</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="order-products pb-5">
                  <div className="main-title">
                    <h4 className="mb-3">المنتجات</h4>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>اسم المنتج</th>
                          <th>الكمية</th>
                          <th>السعر</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/*  {order.products.map((pro) => {
                          return (
                            <tr key={pro.product_id}>
                              <td>{pro.product_id}</td>
                              <td>{pro.name}</td>
                              <td>{pro.quantity}</td>
                              <td>{pro.price}</td>
                            </tr>
                          );
                        })}*/}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="export-bill">
                <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
                  <div className={`modal-change ${isOpen ? "open" : ""}`}>
                    <div className="close mb-3" onClick={toggleModal}>
                      <IoMdCloseCircleOutline className="fs-3" />
                    </div>
                    <div className="ps-1 pe-1">
                      <div className="d-flex justify-content-between align-items-center flex-row-reverse mb-3">
                        <span className="fs-5">
                          اصدار بوليصة الشحن الخاصة بالطلب - {order.id}
                        </span>
                      </div>
                      <div className="bill-option">
                        <div className="bill-option-details w-100 mb-2">
                          <p>خيارات البوليصة</p>
                          <select
                            name=""
                            id=""
                            className="w-100 select-num"
                            onChange={handleChangeNumBoxs}
                          >
                            <option value="">اختر عدد الكراتين</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="bill-price d-flex justify-content-between align-items-center w-100 mb-2">
                          <span>رسوم اصدار البوليصة</span>
                          <span>26.7 ر.س</span>
                        </div>
                        <div className="bill-price d-flex justify-content-between align-items-center w-100 mb-2">
                          <span>رصيد المحفظة</span>
                          <span>الرصيد : {wallet.balance} ر.س</span>
                        </div>
                        <div className="submit-bill">
                          <button class="btn-24" onClick={() => checkBlance()}>
                            <span>اصدار</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </div>
              <div className="order-statue-change">
                <div className={`modal-overlay ${isOpenStatue ? "open" : ""}`}>
                  <div className={`modal-change ${isOpenStatue ? "open" : ""}`}>
                    <div className="close mb-3" onClick={toggleModalStatue}>
                      <IoMdCloseCircleOutline className="fs-3" />
                    </div>
                    <div className="ps-1 pe-1">
                      <div className="d-flex justify-content-between align-items-center flex-row-reverse mb-3">
                        <span className="fs-5">
                          {order.id} - تغير حالة الطلب رقم
                        </span>
                      </div>
                      <div className="bill-option">
                        <div className="bill-option-details w-100 mb-2">
                          <select
                            name="shipping_status"
                            id=""
                            className="w-100 select-num"
                            onChange={handleChange}
                          >
                            <option value="اختر حالة الطلب">
                              اختر حالة الطلب
                            </option>
                            <option value="جار التجهيز">جار التجهيز</option>
                            <option value="تم الشحن">تم الشحن</option>
                            <option value="تم التوصيل">تم التوصيل</option>
                            <option value="قيد الاسترجاع">قيد الاسترجاع</option>
                            <option value="مسترجع">مسترجع</option>
                          </select>
                        </div>
                        <div className="submit-bill">
                          <button
                            class="btn-24"
                            onClick={() => {
                              formSubmet();
                              refresh();
                            }}
                          >
                            <span>تعديل</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default OrderInfo;
