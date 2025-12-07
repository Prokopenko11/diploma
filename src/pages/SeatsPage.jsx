import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSeats } from '../api/getSeats';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassengers } from '../redux/slices/passengerSlice';
import { resetTotalPrice } from '../redux/slices/totalPriceSlice';
import { setRoutes } from '../redux/slices/routeSlice';

import HeaderNavigation from '../components/HeaderNavigation';
import TripSearch from '../components/TripSearch';
import LoadingBar from '../components/Loading/LoadingBar';
import OrderStages from '../components/OrderStages';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer';
import RouteDetails from '../components/SeatsChoice/RouteDetails';
import PassengerCount from '../components/SeatsChoice/PassengerCounter';
import WagonType from '../components/SeatsChoice/WagonType';
import WagonInformation from '../components/SeatsChoice/WagonInformation';

const SeatsPage = () => {
  const dispatch = useDispatch();

  const { departure, arrival } = useSelector((state) => state.selectedTicket);

  const [departureSeats, setDepartureSeats] = useState(null);
  const [arrivalSeats, setArrivalSeats] = useState(null);

  const [activeTypeForward, setActiveTypeForward] = useState(null);
  const [activeWagonIndexForward, setActiveWagonIndexForward] = useState(0);

  const [activeTypeBackward, setActiveTypeBackward] = useState(null);
  const [activeWagonIndexBackward, setActiveWagonIndexBackward] = useState(0);

  const selectedSeats = useSelector((state) => state.seats.selectedSeats);

  const passengers = useSelector((state) => state.passengers);
  const { forward, backward } = passengers;

  const totalPassengersForward = forward.adults + forward.children + forward.infants;
  const totalPassengersBackward = backward.adults + backward.children + backward.infants;

  const totalSelectedSeatsForward = selectedSeats.filter(seat => seat.direction === 'forward').length;
  const totalSelectedSeatsBackward = selectedSeats.filter(seat => seat.direction === 'backward').length;

  const isNextDisabled = totalSelectedSeatsForward !== totalPassengersForward || totalSelectedSeatsBackward !== totalPassengersBackward;

  useEffect(() => {
    dispatch(resetPassengers());
    dispatch(resetTotalPrice());

    if (departure?._id) {
      getSeats(departure._id)
        .then(data => setDepartureSeats(data))
        .catch(err => console.error('Ошибка загрузки мест на отправление:', err));
    }

    if (arrival?._id) {
      getSeats(arrival._id)
        .then(data => setArrivalSeats(data))
        .catch(err => console.error('Ошибка загрузки мест на прибытие:', err));
    }
  }, [departure, arrival, dispatch]);

  return (
    <>
      <header id="header" className="tickets-page__header">
        <HeaderNavigation />
        <TripSearch />
        <LoadingBar />
      </header>
      <section className="stages">
        <OrderStages stage={2} />
      </section>
      <main className="tickets-page__main">
        <Sidebar />
        <section className="seats-page__content">
          <h2 className="seats-page__content-title">Выбор мест</h2>
          <div className="seats-page__content-wrapper">
            {departureSeats && (
              <div className="seats-details">
                <div className="seats-page__direction">
                  <svg width="76" height="60" viewBox="0 0 76 60">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 0C2.23877 0 0 2.23859 0 5V55C0 57.7614 2.23877 60 5 60H71C73.7612 60 76 57.7614 76 55V5C76 2.23859 73.7612 0 71 0H5ZM42.3628 32.8239V40C45.9434 36.6445 49.5586 33.2558 53 30.0664C49.5239 26.7774 45.9434 23.3887 42.3281 20V27.5747H23V32.8239H42.3628Z"
                      fill="#FFA800"
                    />
                  </svg>
                  <Link to="/tickets" className="seats-page__direction-btn">
                    Выбрать другой поезд
                  </Link>
                </div>
                <RouteDetails
                  from={departure.from}
                  to={departure.to}
                  duration={departure.duration}
                  isForward={true}
                />
                <PassengerCount direction="forward" />
                <WagonType
                  coaches={departureSeats}
                  activeType={activeTypeForward}
                  onSelect={setActiveTypeForward}
                />
                {activeTypeForward && (
                  <WagonInformation
                    coaches={departureSeats}
                    activeType={activeTypeForward}
                    activeWagonIndex={activeWagonIndexForward}
                    onWagonChange={setActiveWagonIndexForward}
                    direction="forward"
                  />
                )}
              </div>
            )}
            {arrival && arrivalSeats && (
              <div className="seats-details">
                <div className="seats-page__direction seats-page__direction-right">
                  <svg width="76" height="60" viewBox="0 0 32 26">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27 0C29.7612 0 32 2.23853 32 5V21C32 23.7615 29.7612 26 27 26H5C2.23877 26 0 23.7615 0 21V5C0 2.23853 2.23877 0 5 0H27ZM14.1631 14.2236V17.3333C12.6558 15.8793 11.1333 14.4108 9.68457 13.0288C11.1479 11.6035 12.6558 10.135 14.1777 8.66663V11.949H22.3159V14.2236H14.1631Z"
                      fill="#FFA800"
                    />
                  </svg>
                  <Link to="/tickets" className="seats-page__direction-btn">
                    Выбрать другой поезд
                  </Link>
                </div>
                <RouteDetails
                  from={arrival.from}
                  to={arrival.to}
                  duration={arrival.duration}
                  isForward={false}
                />
                <PassengerCount direction="backward" />
                <WagonType
                  coaches={arrivalSeats}
                  activeType={activeTypeBackward}
                  onSelect={setActiveTypeBackward}
                />
                {activeTypeBackward && (
                  <WagonInformation
                    coaches={arrivalSeats}
                    activeType={activeTypeBackward}
                    activeWagonIndex={activeWagonIndexBackward}
                    onWagonChange={setActiveWagonIndexBackward}
                    direction="backward"
                  />
                )}
              </div>
            )}
          </div>
          <div className="seats-page__content-button-wrapper">
            <Link
              to="/passengers"
              onClick={(e) => {
                if (isNextDisabled) {
                  e.preventDefault();
                  return;
                }
                dispatch(setRoutes({ departure, arrival }));
              }}
              className={`seats-page__content-button ${isNextDisabled ? 'is-disabled' : ''}`}
              disabled={isNextDisabled}
            >
              ДАЛЕЕ
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SeatsPage;
