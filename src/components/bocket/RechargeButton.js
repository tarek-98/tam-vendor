import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWalletData } from "../../store/walletSlice";
import axios from "axios";
import "./bocket.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RechargeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();

  const handleRecharge = async () => {
    try {
      // Simulate recharge API call (you can replace with actual API endpoint)
      await axios.post("http://localhost:9000/wallet/recharge", {
        amount: 1000,
      });

      // Fetch updated wallet data after recharge
      dispatch(fetchWalletData());
    } catch (error) {
      console.error("Error recharging wallet:", error);
    }
  };

  return (
    <Fragment>
      <button
        className="recharge-button mb-3"
        onClick={() => {
          toggleModal();
        }}
      >
        شحن المحفظة
      </button>
      <div className="export-bill">
        <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
          <div className={`modal-change ${isOpen ? "open" : ""}`}>
            <div className="close mb-3" onClick={toggleModal}>
              <IoMdCloseCircleOutline className="fs-3" />
            </div>
            <div className="ps-1 pe-1">
              <div className="d-flex justify-content-end align-items-center flex-row-reverse mb-3">
                <span className="fs-5">شحن المحفظة</span>
              </div>
              <div>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>مبلغ الشحن</Form.Label>
                    <Form.Control type="text" placeholder="اكتب مبلغ الشحن" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    شحن
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Fragment>
  );
};

export default RechargeButton;
