import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPassengers } from '../../redux/slices/passengerSlice';
import ModalMessage from '../ModalMessage';

const PassengerCount = ({ direction = 'forward' }) => {
  const dispatch = useDispatch();
  const { adults, children, infants } = useSelector((state) => state.passengers[direction]);

  const [editing, setEditing] = useState(null);
  const [input, setInput] = useState({ adults: '', children: '', infants: '' });
  const [showModal, setShowModal] = useState(false);

  const total = adults + children + infants;
  const remaining = Math.max(6 - total, 0);

  const handleChange = (e, type) => {
    setInput((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const apply = (type) => {
    const count = parseInt(input[type], 10);
    if (isNaN(count) || count < 0) {
      setEditing(null);
      return;
    }

    const next = {
      adults: type === 'adults' ? count : adults,
      children: type === 'children' ? count : children,
      infants: type === 'infants' ? count : infants,
    };

    const totalNext = next.adults + next.children + next.infants;
    if (totalNext > 6) {
      setShowModal(true);
      setEditing(null);
      return;
    }

    dispatch(setPassengers({ direction, type, value: count }));

    setEditing(null);
    setInput((prev) => ({ ...prev, [type]: '' }));
  };

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      apply(type);
    }
  };

  const getPassengerText = (type) => {
    const count = type === 'adults' ? adults : type === 'children' ? children : infants;
    switch (type) {
      case 'adults':
        return `Взрослых — ${count}`;
      case 'children':
        return `Детских — ${count}`;
      case 'infants':
        return `Детских «без места» — ${count}`;
    }
  };

  const getPassengerWord = (count) => {
    if (count === 1) return 'пассажира';
    if (count >= 2 && count <= 4) return 'пассажира';
    return 'пассажиров';
  };

  const handleInputClick = (type) => {
    setEditing(type);
    const currentValue = type === 'adults' ? adults : type === 'children' ? children : infants;
    setInput((prev) => ({
      ...prev,
      [type]: currentValue === 0 ? '' : String(currentValue)
    }));
  };

  return (
    <div className="passenger-count">
      <h2 className="passenger-count__title">Количество билетов</h2>
      <div className="passenger-count__content">
        {['adults', 'children', 'infants'].map((type) => (
          <div className="passenger-count__wrapper" key={type}>
            {editing === type ? (
              <input
                type="text"
                className="passenger-count__wrapper-input"
                autoFocus
                value={input[type]}
                onChange={(e) => handleChange(e, type)}
                onBlur={() => apply(type)}
                onKeyDown={(e) => handleKeyDown(e, type)}
              />
            ) : (
              <div
                className="passenger-count__wrapper-input display"
                onClick={() => handleInputClick(type)}
              >
                {getPassengerText(type) || (
                  type === 'adults'
                    ? 'Взрослых — 0'
                    : type === 'children'
                      ? 'Детских — 0'
                      : 'Детских «без места» — 0'
                )}
              </div>
            )}
            {type !== 'infants' && (
              <p className={`passenger-count__wrapper-text ${type === 'children' ? 'wrapper-text__grey' : ''}`}>
                {type === 'children'
                  ? `Можно добавить еще ${remaining} ${getPassengerWord(remaining)} до 10 лет. Свое место в вагоне, как у взрослых, но дешевле на 50–65%`
                  : `Можно добавить еще ${remaining} ${getPassengerWord(remaining)}`}
              </p>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <ModalMessage
          type="info"
          title="Превышен лимит"
          message="Можно добавить не более 6 пассажиров в одном заказе."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PassengerCount;
