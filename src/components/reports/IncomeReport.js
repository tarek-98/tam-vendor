import React from "react";
import { Table } from "react-bootstrap";
import "./incomeRebort.css";
import { FaInfo } from "react-icons/fa6";

function IncomeReport() {
  return (
    <div className="user-profile">
      <div className="income-report">
        <div className="container">
          <div className="table">
            <div className="main-title mb-4">
              <h3>تقارير الدخل</h3>
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>كود الطلب</th>
                  <th>تاريخ الطلب</th>
                  <th>اجمالي الطلب</th>
                  <th className="d-flex align-items-center">
                    <span>نسبة تمقل</span>
                    <span className="info-icon-re popup-container">
                      <FaInfo />
                    </span>
                  </th>
                  <th>مبلغ البائع</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7854</td>
                  <td>12/06/2024</td>
                  <td>1200 ر.س</td>
                  <td>{1200 * 0.15}</td>
                  <td>{1200 - 1200 * 0.15}</td>
                  <td>تم الدفع</td>
                </tr>
                <tr>
                  <td>2525</td>
                  <td>12/06/2024</td>
                  <td>2200 ر.س</td>
                  <td>{2200 * 0.15}</td>
                  <td>{2200 - 2200 * 0.15}</td>
                  <td>تم الدفع</td>
                </tr>
                <tr>
                  <td>7478</td>
                  <td>12/06/2024</td>
                  <td>1700 ر.س</td>
                  <td>{1700 * 0.15}</td>
                  <td>{1700 - 1700 * 0.15}</td>
                  <td>باقي</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeReport;
