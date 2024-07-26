// src/components/CouponPage.js
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchCoupons,
  addCoupon,
  updateCoupon,
  deleteCoupon,
} from "../../store/couponsSlice";
import "./coupon.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const CouponPage = () => {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupons.coupons);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
    discountType: "",
  });
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [editingValues, setEditingValues] = useState({
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
    discountType: "",
  });

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleAddCoupon = () => {
    if (
      newCoupon.code &&
      newCoupon.discount &&
      newCoupon.startDate &&
      newCoupon.endDate &&
      newCoupon.discountType
    ) {
      dispatch(addCoupon(newCoupon));
      setNewCoupon({
        code: "",
        discountType: "",
        discount: "",
        startDate: "",
        endDate: "",
      });
      toast.success("تمت اضافة الكوبون", {
        position: "top-left",
      });
    } else {
      if (newCoupon.code === "") {
        toast.error("الكود مطلوب", {
          position: "top-left",
        });
      } else if (newCoupon.discountType === "") {
        toast.error("النوع مطلوب", {
          position: "top-left",
        });
      } else if (newCoupon.discount === "") {
        toast.error("الخصم مطلوب", {
          position: "top-left",
        });
      } else if (newCoupon.startDate === "") {
        toast.error("التاريخ مطلوب", {
          position: "top-left",
        });
      } else if (newCoupon.endDate === "") {
        toast.error("التاريخ مطلوب", {
          position: "top-left",
        });
      }
    }
  };

  const handleEditButtonClick = (coupon) => {
    setEditingCoupon(coupon.id);
    setEditingValues({
      code: coupon.code,
      discount: coupon.discount,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      discountType: coupon.discountType,
    });
  };

  const handleUpdateCoupon = () => {
    if (
      editingValues.code &&
      editingValues.discount &&
      editingValues.startDate &&
      editingValues.endDate &&
      editingValues.discountType
    ) {
      dispatch(updateCoupon({ id: editingCoupon, ...editingValues }));
      setEditingCoupon(null);
    }
  };

  const isCouponValid = (coupon) => {
    const currentDate = new Date();
    const endDate = new Date(coupon.endDate);
    return currentDate <= endDate;
  };

  function sweetAlertDel(couponId) {
    Swal.fire({
      title: "هل انت متأكد؟",
      text: "هل تريد حذف الكوبون",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم حذف",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("تم حذف الكوبون", {
          position: "top-left",
        });
        dispatch(deleteCoupon(couponId));
      }
    });
  }

  return (
    <div className="vendor-coupons">
      <div className="container">
        <Container>
          <Title>الكوبونات</Title>
          <Form>
            <Input
              type="text"
              placeholder="اكتب الكود"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, code: e.target.value })
              }
            />
            <select
              value={newCoupon.discountType}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, discountType: e.target.value })
              }
            >
              <option value="">اختر نوع الخصم</option>
              <option value="percent">بالنسبة</option>
              <option value="flat">بالريال</option>
            </select>
            <Input
              type="text"
              placeholder="الخصم"
              value={newCoupon.discount}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, discount: e.target.value })
              }
            />
            <Input
              type="date"
              placeholder="تاريخ البداية"
              value={newCoupon.startDate}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, startDate: e.target.value })
              }
            />
            <Input
              type="date"
              placeholder="تاريخ النهاية"
              value={newCoupon.endDate}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, endDate: e.target.value })
              }
            />
            <Button onClick={handleAddCoupon}>اضافة</Button>
          </Form>
          <List>
            {coupons.map((coupon) => (
              <ListItem key={coupon.id} className="flex-wrap">
                {editingCoupon === coupon.id ? (
                  <Fragment>
                    <Input
                      type="text"
                      value={editingValues.code}
                      onChange={(e) =>
                        setEditingValues({
                          ...editingValues,
                          code: e.target.value,
                        })
                      }
                    />
                    <select
                      value={editingValues.discountType}
                      onChange={(e) =>
                        setEditingValues({
                          ...editingValues,
                          discountType: e.target.value,
                        })
                      }
                    >
                      <option value="">اختر نوع الخصم</option>
                      <option value="percent">بالمائة</option>
                      <option value="flat">الريال</option>
                    </select>
                    <Input
                      type="text"
                      value={editingValues.discount}
                      onChange={(e) =>
                        setEditingValues({
                          ...editingValues,
                          discount: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="date"
                      value={editingValues.startDate}
                      onChange={(e) =>
                        setEditingValues({
                          ...editingValues,
                          startDate: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="date"
                      value={editingValues.endDate}
                      onChange={(e) =>
                        setEditingValues({
                          ...editingValues,
                          endDate: e.target.value,
                        })
                      }
                    />
                    <Button onClick={handleUpdateCoupon}>حفظ</Button>
                    <Button onClick={() => setEditingCoupon(null)}>
                      الغاء
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <CouponDetails>
                      <strong>{coupon.code}</strong> -{" "}
                      {coupon.discountType === "percent"
                        ? `% ${coupon.discount}`
                        : `ر.س ${coupon.discount}`}
                      <br />
                      <span>
                        {coupon.startDate} <br /> to {coupon.endDate}
                      </span>
                    </CouponDetails>
                    {isCouponValid(coupon) ? (
                      <Fragment>
                        <Button onClick={() => handleEditButtonClick(coupon)}>
                          تعديل
                        </Button>
                        <Button
                          onClick={() => sweetAlertDel(coupon.id)}
                          className="del"
                        >
                          حذف
                        </Button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className="me-2">Coupon expired</span>
                        <Button onClick={() => handleEditButtonClick(coupon)}>
                          تعديل
                        </Button>
                        <Button
                          onClick={() => sweetAlertDel(coupon.id)}
                          className="del"
                        >
                          حذف
                        </Button>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </ListItem>
            ))}
          </List>
          <ToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default CouponPage;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  flex: 1;
  min-width: 180px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:last-child {
    margin-right: 2px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const CouponDetails = styled.div`
  flex: 1;
  margin-right: 10px;
`;
