import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import AddPassengerButton from './AddPassengerButton';
import PassengerInformation from './PassengerInformation';
import { initializePassengers } from '../../redux/slices/passengerSlice';

const PassengerInformationList = ({ onValidationChange }) => {
  const dispatch = useDispatch();
  const passengers = useSelector((state) => state.passengers.forward);
  const passengersCount = passengers.adults + passengers.children;

  const [openPassengers, setOpenPassengers] = useState([]);
  const [validPassengers, setValidPassengers] = useState({});

  useEffect(() => {
    dispatch(initializePassengers(passengersCount));
    setOpenPassengers([]);
    setValidPassengers({});
  }, [passengersCount, dispatch]);

  const handleOpen = (index) => setOpenPassengers((prev) => [...prev, index]);
  const handleClose = (index) => setOpenPassengers((prev) => prev.filter(i => i !== index));

  const handleValidityChange = (index, isValid) => {
    setValidPassengers(prev => ({ ...prev, [index]: isValid }));
  };

  const allValid =
    Object.keys(validPassengers).length === passengersCount &&
    Object.values(validPassengers).every(Boolean);

  useEffect(() => onValidationChange(allValid), [allValid, onValidationChange]);

  const handleNextPassenger = (index) => {
    if (index + 1 < passengersCount) {
      setOpenPassengers(prev => [...prev, index + 1]);
    }
  };

  return (
    <div className="passenger-information__list">
      {Array.from({ length: passengersCount }, (_, index) => (
        <div key={index}>
          {openPassengers.includes(index) ? (
            <PassengerInformation
              passengerNumber={index + 1}
              onClose={() => handleClose(index)}
              onValidityChange={(isValid) => handleValidityChange(index, isValid)}
              onNextPassenger={() => handleNextPassenger(index)}
              isLastPassenger={index + 1 === passengersCount}
              allPassengers={Object.values(validPassengers)}
            />
          ) : (
            <div onClick={() => handleOpen(index)}>
              <AddPassengerButton passengerNumber={index + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PassengerInformationList;