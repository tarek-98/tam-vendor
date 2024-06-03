import React, { Fragment, useEffect, useState } from "react";
import "./shipping.css";
import aramex from "../../assets/images/aramex.png";
import samsa from "../../assets/images/samsa.png";
import aymakan from "../../assets/images/aymakan.webp";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  IoIosArrowBack,
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

function Shipping() {
  const dispatch = useDispatch();
  const methods = useSelector((state) => state.shipping.methods);
  const status = useSelector((state) => state.shipping.status);
  const error = useSelector((state) => state.shipping.error);

  const [comOption, setComOption] = useState(false);
  const [idToggle, setIdToggle] = useState(0);
  const [prices, setPrices] = useState({});

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

  const handleSave = (id) => {
    dispatch(updateShippingMethodPrice({ id, price: prices[id] }));
  };

  const handleToggle = (id) => {
    dispatch(toggleShippingMethod(id));
  };

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
              <div
                className="shipping-company"
                key={com.id}
                onClick={() => {
                  setComOption((comOption) => !comOption);
                  setIdToggle(com.id);
                }}
              >
                <div className="image">
                  <img src={com.image} alt="" srcset="" />
                </div>
                <div className="name">
                  <p className="m-0">{com.name}</p>
                </div>
                <div className="">
                  <IoIosArrowBack className="me-3 fw-bold" />
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
                <div className="close">
                  <IoIosCloseCircleOutline
                    onClick={() => setComOption((comOption) => !comOption)}
                  />
                  <p className="m-0">{com.name}</p>
                </div>
                <div className="co-content">
                  <form>
                    <div key={com.id} className="p-3">
                      <TextField
                        label={com.name}
                        type="number"
                        value={prices[com.id]}
                        onChange={(e) => handleChange(e, com.id)}
                      />
                      <Button onClick={() => handleSave(com.id)}>Save</Button>
                    </div>
                  </form>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Shipping;
