import React, { useEffect } from "react";
import "./bocket.css";
import WalletItem from "./WalletItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchWalletData } from "../../store/walletSlice";
import RechargeButton from "./RechargeButton";

function Bocket() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(fetchWalletData());
  }, [dispatch]);

  let content;

  if (wallet.status === "loading") {
    content = <p className="loading">Loading...</p>;
  } else if (wallet.status === "succeeded") {
    content = (
      <div>
        <div className="balance">الرصيد : {wallet.balance} ر.س</div>
        <RechargeButton />
        <h3>العمليات:</h3>
        <ul className="transactions">
          {wallet.transactions.map((transaction) => (
            <WalletItem
              key={transaction.id}
              description={transaction.description}
              amount={transaction.amount}
              date={transaction.date}
            />
          ))}
        </ul>
      </div>
    );
  } else if (wallet.status === "failed") {
    content = <p className="error">{wallet.error}</p>;
  }

  return (
    <div className="bocket-main">
      <div className="container">
        <section>{content}</section>
      </div>
    </div>
  );
}

export default Bocket;
