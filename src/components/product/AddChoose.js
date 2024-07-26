import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChoose } from "../../store/addProductSlice";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "./addProduct.css";

function AddChoose({ productId, optionsMenu }) {
  const { status } = useSelector((state) => state.addProduct);
  const dispatch = useDispatch();
  const initialState = {
    namechoose: "",
    pricetypechoose: "",
    price: "",
    pricechoose: "",
    color: "",
    img: null,
  };

  const [formDataChoose, setFormDataChoose] = useState(initialState);

  useEffect(() => {
    if (status === "chooseAdded") {
      setFormDataChoose(initialState); // Reset form fields after successful submission
      toast.success("تم اضافة الخيار", {
        position: "top-left",
      });
    }
  }, [status]);

  const handleChangeChoose = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormDataChoose({
        ...formDataChoose,
        [name]: files[0],
      });
    } else {
      setFormDataChoose({
        ...formDataChoose,
        [name]: value,
      });
    }
  };

  const handleSaveChoose = () => {
    const formDataObjChoose = new FormData();
    Object.keys(formDataChoose).forEach((key) => {
      formDataObjChoose.append(key, formDataChoose[key]);
    });
    dispatch(addChoose({ productId, productChooseData: formDataObjChoose }));
  };

  return (
    <div className="user-profile">
      <div className={optionsMenu ? "optionsMenu" : "optionsMenu-hide"}>
        <div className="rtl-form container mt-4 p-4 shadow-sm rounded bg-white">
          <div className="form-group mb-4">
            <label htmlFor="namechoose" className="form-label fs-4">
              نوع الخيار
            </label>
            <input
              type="text"
              name="namechoose"
              value={formDataChoose.namechoose}
              className="form-control"
              id="namechoose"
              onChange={handleChangeChoose}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="pricetypechoose" className="form-label fs-4">
              هل الخيار نفس السعر الاصلي
            </label>
            <input
              type="text"
              name="pricetypechoose"
              value={formDataChoose.pricetypechoose}
              className="form-control"
              id="pricetypechoose"
              onChange={handleChangeChoose}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="color" className="form-label fs-4">
              الخيار
            </label>
            <input
              type="text"
              name="color"
              value={formDataChoose.color}
              className="form-control"
              id="color"
              onChange={handleChangeChoose}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="pricechoose" className="form-label fs-4">
              سعر الخيار
            </label>
            <input
              type="text"
              name="pricechoose"
              value={formDataChoose.pricechoose}
              className="form-control"
              id="pricechoose"
              onChange={handleChangeChoose}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="img" className="form-label fs-4">
              صورة الخيار
            </label>
            <input
              className="form-control chooseFile"
              type="file"
              name="img"
              id="img"
              onChange={handleChangeChoose}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="p-2 d-flex align-items-center"
              onClick={handleSaveChoose}
            >
              <FaPlus className="me-2" />
              <span>اضافة</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddChoose;
