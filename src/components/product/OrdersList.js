import React, { useEffect, useState } from "react";
import "./ordersList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProducts, getAllProducts } from "../../store/productSlice";
import { Table } from "react-bootstrap";
import { fetchOrders } from "../../store/ordersSlice";

function OrdersList() {
  const orders = useSelector((state) => state.orders);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    id: "",
    statu: "",
    date: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.id === "" || order.id.toString().includes(filters.id)) &&
        order.statu.toLowerCase().includes(filters.statu.toLowerCase()) &&
        (filters.date === "" || order.date.toLowerCase().includes(filters.date))
    );
    setFilteredOrders(filtered);
  }, [filters, orders]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="vendor-orders pt-5 pe-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-5">
            <div className="filter-order">
              <div>
                <label htmlFor="">رقم الطلب</label>
                <input
                  type="text"
                  name="id"
                  placeholder="رقم الطلب"
                  value={filters.id}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="">اسم العميل</label>
                <input
                  type="text"
                  name="name"
                  placeholder="اسم العميل"
                  value={filters.name}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="">حالة الطلب</label>
                <input
                  type="text"
                  name="statu"
                  placeholder="حالة الطلب"
                  value={filters.statu}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="">تاريخ الاضافة</label>
                <input
                  type="date"
                  name="date"
                  placeholder="تاريخ الاضافة"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="orders-table">
              <h3 className="mb-3">قائمة الطلبات</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>رقم الطلب</th>
                    <th>اسم العميل</th>
                    <th>حالة الطلب</th>
                    <th>مبلغ الطلب</th>
                    <th>تاريخ الاضافة</th>
                    <th>تحرير</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => {
                    return (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.statu}</td>
                        <td>{order.price} ر.س</td>
                        <td>{order.date}</td>
                        <td>استعراض</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersList;
