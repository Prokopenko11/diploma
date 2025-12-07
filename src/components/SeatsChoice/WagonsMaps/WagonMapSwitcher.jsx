import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toggleSeat } from '../../../redux/slices/seatsSlice';
import isEqual from 'lodash/isEqual';
import { setTotalPrice } from '../../../redux/slices/totalPriceSlice';
import { calculateTotalPrice } from '../../../api/calculateTotalPrice';
import { useState } from 'react';
import { formatPrice } from '../../../api/formatPrice';

import FirstClassMap from './FirstClassMap';
import SecondClassMap from './SecondClassMap';
import ThirdClassMap from './ThirdClassMap';
import FourthClassMap from './FourthClassMap';
import WagonInfoPanel from '../WagonInfoPanel';
import ModalMessage from '../../ModalMessage';

const WagonMapSwitcher = ({ coach, number, availableSeats, direction }) => {
  const classType = coach.coach.class_type;

  const topPrice = formatPrice(coach.coach['top_price']);
  const bottomPrice = formatPrice(coach.coach['bottom_price']);
  const price = formatPrice(coach.coach.price);

  const [selectedOptions, setSelectedOptions] = useState({
    ac: false,
    wifi: false,
    linens: false,
  });

  const handleToggleOption = (key) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) =>
    state.seats.selectedSeats.filter((s) => s.direction === direction)
  );
  const passengers = useSelector((state) => state.passengers[direction]);
  const maxSelectable = passengers.adults + passengers.children;

  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleSeatClick = (seat) => {
    const seatWithCoach = {
      ...seat,
      coach_id: coach.coach._id,
      direction,
    };

    const isSelected = selectedSeats.some(
      (s) => s.index === seat.index && s.coach_id === coach.coach._id
    );

    if (!isSelected && selectedSeats.length >= maxSelectable) {
      setShowLimitModal(true);
      return;
    }

    dispatch(toggleSeat(seatWithCoach));
  };

  const mapProps = {
    seats: coach.seats,
    number,
    coachId: coach.coach._id,
    selectedSeats,
    onSeatClick: handleSeatClick,
  };

  const wagonInfoProps = {
    number,
    availableSeats,
    options: coach.coach,
    onToggleOption: handleToggleOption,
    selectedOptions,
    classType: coach.coach.class_type,
  };

  const currentPrice = useSelector((state) => state.totalPrice[direction]);

  useEffect(() => {
    const priceData = calculateTotalPrice({
      selectedSeats,
      coach,
      passengers,
      selectedOptions,
    });

    if (!isEqual(currentPrice, priceData)) {
      dispatch(setTotalPrice({ direction, ...priceData }));
    }
  }, [selectedSeats, coach, passengers, selectedOptions, dispatch, direction, currentPrice]);


  return (
    <div className="wagon-map-wrapper">
      {showLimitModal && (
        <ModalMessage
          type="info"
          title="Все места выбраны"
          message="Вы уже выбрали нужное количество мест. Чтобы изменить выбор, отмените одно из текущих."
          onClose={() => setShowLimitModal(false)}
        />
      )}
      {classType === 'third' && (
        <>
          <WagonInfoPanel {...wagonInfoProps} prices={[topPrice, bottomPrice]} />
          <ThirdClassMap {...mapProps} />
        </>
      )}
      {classType === 'second' && (
        <>
          <WagonInfoPanel {...wagonInfoProps} prices={[topPrice, bottomPrice]} />
          <SecondClassMap {...mapProps} />
        </>
      )}
      {classType === 'first' && (
        <>
          <WagonInfoPanel {...wagonInfoProps} prices={[price]} />
          <FirstClassMap {...mapProps} />
        </>
      )}
      {classType === 'fourth' && (
        <>
          <WagonInfoPanel {...wagonInfoProps} prices={[topPrice]} />
          <FourthClassMap {...mapProps} />
        </>
      )}
    </div>
  );
};

export default WagonMapSwitcher;
