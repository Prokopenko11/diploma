import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import HeaderNavigation from '../components/HeaderNavigation';
import TripSearch from '../components/TripSearch';
import LoadingBar from '../components/Loading/LoadingBar';
import OrderStages from '../components/OrderStages';
import PassengersSidebar from '../components/Passengers/PassengersSidebar';
import Footer from '../components/Footer';
import PassengerInformationList from '../components/Passengers/PassengerInformationList';

const PassengersPage = () => {
  const departure = useSelector(state => state.routes.departure);
  const arrival = useSelector(state => state.routes.arrival);

  const [allValid, setAllValid] = useState(false);

  return (
    <>
      <header id="header" className="passenger__header">
        <HeaderNavigation />
        <TripSearch />
        <LoadingBar />
      </header>
      <section className="stages">
        <OrderStages stage={2} />
      </section>
      <main className="passengers__main">
        <PassengersSidebar departure={departure} arrival={arrival} />
        <div className="passenger-information__list-wrapper">
          <PassengerInformationList
            onValidationChange={setAllValid}
          />
          <div className="passenger-information__list-button">
            <Link to="/payment">
              <button
                className={`next-button ${allValid ? "active" : "disabled"}`}
                disabled={!allValid}
              >
                Далее
              </button>
            </Link>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};


export default PassengersPage;