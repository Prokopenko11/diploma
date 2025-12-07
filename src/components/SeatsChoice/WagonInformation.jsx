import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSeats } from '../../redux/slices/seatsSlice';
import { formatPrice } from '../../api/formatPrice';
import WagonMapSwitcher from './WagonsMaps/WagonMapSwitcher';

const WagonInformation = ({ coaches, activeType, activeWagonIndex, onWagonChange, direction }) => {
  const dispatch = useDispatch();

  const filtered = activeType
    ? coaches.filter((item) => item.coach.class_type === activeType)
    : coaches;

  const total = useSelector((state) => state.totalPrice[direction]?.total || null);

  useEffect(() => {
    if (activeWagonIndex !== 0) {
      onWagonChange(0);
    }
    
    dispatch(clearSeats(direction));
  }, [activeType, dispatch, direction, onWagonChange, activeWagonIndex]);

  useEffect(() => {
    dispatch(clearSeats(direction));
  }, [coaches, dispatch, direction]);


  const getAvailableSeats = (classType, seats) => {
    if (classType === 'second' || classType === 'third') {
      const upper = seats.filter(s => s.available && s.index % 2 === 0).length;
      const lower = seats.filter(s => s.available && s.index % 2 !== 0).length;
      return { total: upper + lower, upper, lower };
    }
    return { total: seats.filter(s => s.available).length };
  };

  const getWagonNumber = (coachId) => {
    const index = coaches.findIndex(c => c.coach._id === coachId);
    return `${index + 1}`.padStart(2, '0');
  };

  const activeCoach = filtered[activeWagonIndex];
  if (!activeCoach) return null;

  const activeNumber = getWagonNumber(activeCoach.coach._id);
  const availableSeats = getAvailableSeats(activeCoach.coach.class_type, activeCoach.seats);

  return (
    <div className="wagon-information">
      <div className="wagon-information__header">
        <ul className="wagon-information__header-numbers">
          Вагоны
          {filtered.map((item, index) => {
            const num = getWagonNumber(item.coach._id);
            return (
              <li
                key={item.coach._id}
                className={`wagon-information__header-number ${index === activeWagonIndex ? 'active' : ''}`}
                onClick={() => onWagonChange(index)}
              >
                {num}
              </li>
            );
          })}
        </ul>
        <p className="wagon-information__header-text">Нумерация вагонов начинается с головы поезда</p>
      </div>
      <div className="wagon-information__content">
        <WagonMapSwitcher
          coach={activeCoach}
          number={activeNumber}
          availableSeats={availableSeats}
          direction={direction}
        />
      </div>
      {total !== null && (
        <div className="wagon-information__total-price-wrapper">
          <div className="wagon-information__total-price">
            {formatPrice(total)}<span className="seats-info__price-currency">₽</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WagonInformation;
