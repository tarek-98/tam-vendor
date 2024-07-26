import React from "react";

const WalletItem = ({ description, amount, date }) => {
  return (
    <li className="transaction-item d-flex align-items-center justify-content-between">
      <span className="transaction-description">{description}</span>
      <span className="transaction-date">{date}</span>
      <span className="transaction-amount">{amount} ر.س</span>
    </li>
  );
};

export default WalletItem;
