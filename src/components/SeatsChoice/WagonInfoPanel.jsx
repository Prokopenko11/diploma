import WagonOptions from './WagonOptions';

const WagonInfoPanel = ({ number, availableSeats, prices, classType, options, selectedOptions, onToggleOption }) => {
  function getRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  const passengerNumber = getRandomNumber();

  let passengerStr = '';
  if (passengerNumber === 2 || passengerNumber === 3 || passengerNumber === 4 ) {
    passengerStr = 'человека';
  } else {
    passengerStr = 'человек';
  }

  return (
    <>
      <div className="seat-info__wrapper">
        <div className="seat-info">
          <div className="seat-info__wagon-number">
            {number}
            <br />
            <span className="wagon-number__span">вагон</span>
          </div>
          <div className="seat-info__content">
            <div className="seats-info__number-wrapper">
              <div className="seat-info__total-number">
                <h3 className="seats-info__title">Места</h3>
                <span className="total-number__span">{availableSeats.total}</span>
              </div>
              {(classType === 'second' || classType === 'third') && (
                <div className="seat-info__number-wrapper">
                  <div className="seat-info__number">Верхние<span className="seat-info__number-span">{availableSeats.upper}</span></div>
                  <div className="seat-info__number">Нижние<span className="seat-info__number-span">{availableSeats.lower}</span></div>
                </div>
              )}
            </div>
            <div className="seats-info__price-wrapper">
              <h3 className="seats-info__title">Стоимость</h3>
              <div className="seats-info__prices">
                {prices.map((price, i) => (
                  <div key={i} className="seats-info__price">
                    {price}
                    <span className="seats-info__price-currency">₽</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="seat-info__options">
              <h3 className="seats-info__title">
                Обслуживание <span className="seats-info__title-span">фпк</span>
              </h3>
              <WagonOptions
                coach={options}
                selectedOptions={selectedOptions}
                onToggleOption={onToggleOption}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="wagon-information__passengers-wrapper">
        <div className="wagon-information__passengers">
          {passengerNumber} {passengerStr} выбирают места в этом поезде
        </div>
      </div>
    </>
  );
};

export default WagonInfoPanel;