import { formatPrice } from '../../api/formatPrice';

const TicketTooltip = ({ classType, priceInfo }) => {
  if (!priceInfo || !priceInfo[classType]) return null;

  const prices = priceInfo[classType];

  return (
    <div className="ticket__tooltip">
      {prices.top_price && <div className="tooltip__item">верхние
        <div className="price-wrapper">
          <span className="price__value">{formatPrice(prices.top_price)}</span>
          <span className="ticket__class-currency">₽</span>
        </div>
      </div>}
      {prices.bottom_price && <div className="tooltip__item">нижние
        <div className="price-wrapper">
          <span className="price__value">{formatPrice(prices.bottom_price)}</span>
          <span className="ticket__class-currency">₽</span>
        </div>
      </div>}
      {prices.side_price && <div className="tooltip__item">боковые
        <div className="price-wrapper">
          <span className="price__value">{formatPrice(prices.side_price)}</span>
          <span className="ticket__class-currency">₽</span>
        </div>
      </div>}
    </div>
  );
};

export default TicketTooltip;