import React, { useEffect, useState } from "react";
import "./addProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProducts, getAllProducts } from "../../store/productSlice";
import { Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

function AllProducts() {
  const products = useSelector(getAllProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    unit_price: "",
    product_type: "",
    current_stock: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.unit_price === "" ||
          product.unit_price.toString().includes(filters.unit_price)) &&
        product.product_type
          .toLowerCase()
          .includes(filters.product_type.toLowerCase()) &&
        (filters.current_stock === "" ||
          product.current_stock.toString().includes(filters.current_stock))
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
      name: "Image",
      selector: "image",
      cell: (row) => (
        <img
          src={`${img_url}/${row.images[0]}`}
          alt={row.name}
          style={{ width: "150px", height: "100px", padding: "10px" }}
        />
      ),
      sortable: false,
    },
    {
      name: "السعر",
      selector: (row) => row.unit_price,
      sortable: true,
    },
    {
      name: "الكمية",
      selector: (row) => row.current_stock,
      sortable: true,
    },
    {
      name: "الحالة",
      selector: (row) => row.product_type,
      sortable: true,
    },
    {
      name: "الخيارات",
      cell: (row) => (
        <div className=" d-flex justify-content-center align-items-center">
          <span className="ms-2 edit">
            <MdModeEdit className="fs-6" />
          </span>
          <span className="del">
            <MdDeleteForever className="text-white fs-6" />
          </span>
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
    const timeout = setTimeout(() => {
      setRows(filteredProducts);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
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

  const img_url =
    "https://gomla-wbs.el-programmer.com/storage/app/public/product";

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
                        name="unit_price"
                        placeholder="سعر المنتج"
                        value={filters.unit_price}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="">بحث الحالة</label>
                      <input
                        type="text"
                        name="product_type"
                        placeholder="حالة المنتج"
                        value={filters.product_type}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="">بحث بالكمية</label>
                      <input
                        type="text"
                        name="current_stock"
                        placeholder="كمية المنتج"
                        value={filters.current_stock}
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
