import React, { useEffect, useState } from "react";
import "./addProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProducts,
  fetchAsyncProductsByVendors,
  getAllVendorProducts,
} from "../../store/productSlice";
import { Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { MdOutlineSlideshow } from "react-icons/md";
import { Link } from "react-router-dom";

function AllProducts() {
  const products = useSelector(getAllVendorProducts);
  const { vendorInfo } = useSelector((state) => state.auth);
  const id = vendorInfo.data._id;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    status: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncProductsByVendors(id));
    console.log(vendorInfo.data._id);
    console.log(products);
    console.log(products);
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.price === "" ||
          product.price.toString().includes(filters.price)) &&
        product.status.toLowerCase().includes(filters.status.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const columns = [
    {
      name: "اسم المنتج",
      selector: (row) => row.name,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "الصورة",
      selector: "الصورة",
      cell: (row) => (
        <img
          src={`${row.img}`}
          alt={row.name}
          style={{ width: "100%", padding: "10px" }}
        />
      ),
      sortable: false,
    },
    {
      name: "السعر",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "الحالة",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "الفيديو",
      selector: "video",
      cell: (row) => (
        <video
          src={row.video}
          style={{ width: "100%", height: "100%", padding: "10px" }}
        ></video>
      ),
      sortable: false,
    },
    {
      name: "الخيارات",
      cell: (row) => (
        <div className=" d-flex justify-content-center align-items-center">
          <Link
            className="ms-2 edit"
            to={`/product/edit/${row._id}`}
            title="تعديل"
          >
            <MdModeEdit className="text-black fs-6" />
          </Link>
          <span className="del" title="حذف">
            <MdDeleteForever className="text-white fs-6" />
          </span>
          <Link className="edit me-2" to={`/product/${row._id}`} title="مشاهدة">
            <MdOutlineSlideshow className="text-black fs-6" />
          </Link>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: false,
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "المنتجات بكل صفحة",
    rangeSeparatorText: "من",
  };
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    setRows(filteredProducts);
    setPending(false);
  }, []);

  /*loader*/
  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <div className="spiner"></div>
      <div>الرجاء الاتنظار</div>
    </div>
  );
  /* end */

  /*CSV */
  function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ",";
    lineDelimiter = args.lineDelimiter || "\n";

    keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
      ctr = 0;
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(args) {
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
      data: filteredProducts,
    });
    if (csv == null) return;

    filename = args.filename || "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = "data:text/csv;charset=utf-8," + csv;
    }
    data = encodeURI(csv);

    link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <Button onClick={(e) => onExport(e.target.value)}>تصدير</Button>
  );

  const actionsMemo = React.useMemo(() => (
    <Export onExport={() => downloadCSV(filteredProducts)} />
  ));
  /* */
  /*customStyle */
  const customStyle = {
    rows: {
      style: {
        fontSize: "12px",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        textAlign: "center",
      },
    },
    pagination: {
      style: {
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      },
    },
  };
  /* */

  return (
    <div className="vendor-products pt-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="filter-table">
                    <div>
                      <label htmlFor="">بحث بالاسم</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="اسم المنتح"
                        value={filters.name}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="">بحث بالسعر</label>
                      <input
                        type="text"
                        name="price"
                        placeholder="سعر المنتج"
                        value={filters.price}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="">بحث الحالة</label>
                      <input
                        type="text"
                        name="status"
                        placeholder="حالة المنتج"
                        value={filters.status}
                        onChange={handleFilterChange}
                      />
                    </div>
                    {/*<p>filter</p>*/}
                  </div>
                </div>
              </div>
            </div>
            <div className="dataTableContainer">
              <DataTable
                title="قائمة المنتجات"
                columns={columns}
                data={filteredProducts}
                pagination
                selectableRows
                fixedHeader
                highlightOnHover
                striped
                responsive={true}
                paginationComponentOptions={paginationComponentOptions}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                actions={actionsMemo}
                customStyles={customStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
