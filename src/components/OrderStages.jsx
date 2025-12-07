const OrderStages = ({ stage }) => {
  const getItemClass = (itemStage) => {
    if (stage === itemStage) {
      return 'is-completed current';
    }
    if (stage > itemStage) {
      return 'is-completed';
    }
    return '';
  };

  return (
    <div className="order-stages">
      <ul className="order-stages__list">
        <li className={`order-stages__item ${getItemClass(1)}`}>
          <p className="item__number"><span className="input__number-span">1</span></p>
          <h2 className="item__title">Билеты</h2>
        </li>
        <li className={`order-stages__item ${getItemClass(2)}`}>
          <p className="item__number"><span className="input__number-span">2</span></p>
          <h2 className="item__title">Пассажиры</h2>
        </li>
        <li className={`order-stages__item ${getItemClass(3)}`}>
          <p className="item__number"><span className="input__number-span">3</span></p>
          <h2 className="item__title">Оплата</h2>
        </li>
        <li className={`order-stages__item ${getItemClass(4)}`}>
          <p className="item__number"><span className="input__number-span">4</span></p>
          <h2 className="item__title">Проверка</h2>
        </li>
      </ul>
    </div>
  );
};

export default OrderStages;