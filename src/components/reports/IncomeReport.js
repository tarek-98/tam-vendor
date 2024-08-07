import React, { Fragment, useEffect, useState } from "react";
import "./incomeRebort.css";
import logo1 from "../../assets/images/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentsMethods,
  togglePaymentsMethods,
} from "../../store/tabbySlice";

function IncomeReport() {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments.methods);
  useEffect(() => {
    dispatch(fetchPaymentsMethods());
  }, []);
  const enabledPayment = payments.filter((method) => method.enabled);
  const { vendorInfo } = useSelector((state) => state.auth);
  const data = vendorInfo && vendorInfo.data;

  return (
    <div className="user-profile">
      <div className="income-report">
        <div className="container">
          <div className="table">
            <div className="row">
              <div className="col">
                <div className="income-report-content text-center">
                  <div className="income-logo mb-2">
                    {data && data.logo ? (
                      <img src={data && data.logo} alt="vendorImage" />
                    ) : (
                      <img src={logo1} alt="vendorImage" />
                    )}
                  </div>
                  <div className="ve-name mb-4">
                    <h4>{data && data.vendorName}</h4>
                  </div>
                  <div className="main-title mb-4">
                    <h3>تقارير الدخل</h3>
                  </div>
                  <div className="total-income d-flex justify-content-between align-items-center gap-4">
                    <span>
                      اجمالي المبيعات
                      <br />
                      <span className="income-tax text-black-50">
                        (شامل الضريبة)
                      </span>
                    </span>
                    <span>0 ر.س</span>
                  </div>
                  <hr />
                  <div className="income-details mb-4">
                    <h5>التفاصيل</h5>
                  </div>
                  <div className="income-details-items">
                    <div>
                      <span>المبيعات</span>
                      <span>0</span>
                    </div>
                    <div>
                      <span>ضريبة القيمة المضافة (15%)</span>
                      <span>0</span>
                    </div>
                    <div>
                      <span>عمولة تمقل</span>
                      <span>0</span>
                    </div>
                    <div>
                      <span>مستحقات تابي و تمارا</span>
                      {enabledPayment.length >= 1 ? (
                        <span>7.0</span>
                      ) : (
                        <span>0.0</span>
                      )}
                    </div>
                    <div>
                      <span>المعلق</span>
                      <span>0.0</span>
                    </div>
                    <div>
                      <span>
                        المحول للتاجر
                        <span className="after-rival text-black-50 me-2">
                          بعد خصم المستحقات
                        </span>
                      </span>
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeReport;
