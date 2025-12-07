import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const paymentTypes = {
  cash: "Наличными",
  online: "Онлайн",
};

const onlineTypes = {
  card: "Банковской картой",
  paypal: "PayPal",
  qiwi: "Visa QIWI Wallet",
};

const OrderConfirmationPayment = () => {
  const { type, onlineType } = useSelector((state) => state.payment);

  const paymentText =
    type === "online"
      ? onlineTypes[onlineType] || "Онлайн"
      : paymentTypes[type] || "—";

  return (
    <div className="order-confirmation-payment">
      <header className="order-confirmation__header">
        <h2 className="order-confirmation-title">Способ оплаты</h2>
      </header>
      <div className="order-confirmation-payment__content">
        <p className="order-confirmation-payment__value">
          {paymentText}
        </p>
        <div className="order-confirmation-payment__content-footer">
          <Link
            to="/payment"
          >
            <button className="order-confirmation__edit">Изменить</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPayment;
