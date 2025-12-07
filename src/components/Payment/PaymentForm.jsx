import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentType, setOnlineType } from '../../redux/slices/paymentSlice';
import { loadState, saveState } from '../../redux/saveLocal';

const PaymentForm = ({ onValidate }) => {
  const dispatch = useDispatch();

  const firstPassenger = useSelector((state) => state.passengers.data[0]);
  const paymentType = useSelector((state) => state.payment.type);
  const onlineType = useSelector((state) => state.payment.onlineType);

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [fathername, setFathername] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (firstPassenger) {
      if (firstPassenger.lastName) {
        setLastname(firstPassenger.lastName)
      }
      if (firstPassenger.firstName) {
        setFirstname(firstPassenger.firstName)
      }
      if (firstPassenger.fatherName) {
        setFathername(firstPassenger.fatherName)
      }
    }

    const savedPhone = loadState("phone");
    const savedEmail = loadState("email");

    if (savedPhone) {
      setPhone(savedPhone)}
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [firstPassenger]);

  useEffect(() => {
    if (phone) saveState("phone", phone);
  }, [phone]);

  useEffect(() => {
    if (email) saveState("email", email);
  }, [email]);

  useEffect(() => {
    const valid =
      lastname.trim() &&
      firstname.trim() &&
      fathername.trim() &&
      phone.trim() &&
      email.trim() &&
      (
        paymentType === "cash" ||
        (paymentType === "online" && onlineType)
      );

    onValidate(Boolean(valid));
  }, [
    lastname,
    firstname,
    fathername,
    phone,
    email,
    paymentType,
    onlineType,
    onValidate,
  ]);

  const toggle = (type) => {
    dispatch(setPaymentType(paymentType === type ? "" : type));
  };

  const formatPhone = (input) => {
    let v = input.replace(/\D/g, "");

    if (v.startsWith("8")) {
      v = "7" + v.slice(1)
    }
    if (!v.startsWith("7")) {
      v = "7" + v
    }

    let formatted = "+7";

    if (v.length > 1) {
      formatted += " " + v.slice(1, 4)
    }
    if (v.length > 4) {
      formatted += " " + v.slice(4, 7)}
    if (v.length > 7) {
      formatted += " " + v.slice(7, 9)
    }
    if (v.length > 9) {
      formatted += " " + v.slice(9, 11)
    }

    return formatted;
  };

  return (
    <div className="payment-form-container">
      <form className="payment-form">
        <h2 className="payment-form-title">Персональные данные</h2>
        <div className="payment-input-container">
          <div className="payment-input-name-wrapper">
            <div className="payment-input-wrapper">
              <label className="payment-input-label">Фамилия</label>
              <input
                type="text"
                className="payment-form-input"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="payment-input-wrapper">
              <label className="payment-input-label">Имя</label>
              <input
                type="text"
                className="payment-form-input"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="payment-input-wrapper">
              <label className="payment-input-label">Отчество</label>
              <input
                type="text"
                className="payment-form-input"
                value={fathername}
                onChange={(e) => setFathername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="payment-input-wrapper">
            <label className="payment-input-label">Контактный телефон</label>
            <input
              type="text"
              className="payment-form-input contacts"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="+7 ___ ___ __ __"
              pattern="\+7 [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
              required
            />
          </div>
          <div className="payment-input-wrapper">
            <label className="payment-input-label">E-mail</label>
            <input
              type="email"
              className="payment-form-input contacts"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="inbox@gmail.ru"
              required
            />
          </div>
        </div>
        <h2 className="payment-form-title">Способ оплаты</h2>
        <div className="payment-type">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={paymentType === "online"}
              onChange={() => toggle("online")}
            />
            <span className="checkbox-span">Онлайн</span>
          </label>
          {paymentType === "online" && (
            <div className="payment-type__options">
              <div
                className={`payment-type__option ${
                  onlineType === "card" ? "selected" : ""
                }`}
                onClick={() => dispatch(setOnlineType(onlineType === "card" ? "" : "card"))}
              >
                Банковской <br /> картой
              </div>
              <div
                className={`payment-type__option ${
                  onlineType === "paypal" ? "selected" : ""
                }`}
                onClick={() => dispatch(setOnlineType(onlineType === "paypal" ? "" : "paypal"))}
              >
                PayPal
              </div>
              <div
                className={`payment-type__option ${
                  onlineType === "qiwi" ? "selected" : ""
                }`}
                onClick={() => dispatch(setOnlineType(onlineType === "qiwi" ? "" : "qiwi"))}
              >
                Visa QIWI Wallet
              </div>
            </div>
          )}
        </div>
        <div className="payment-type last">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={paymentType === "cash"}
              onChange={() => toggle("cash")}
            />
            <span className="checkbox-span">Наличными</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
