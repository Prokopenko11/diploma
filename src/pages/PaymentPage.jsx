import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderNavigation from '../components/HeaderNavigation';
import TripSearch from '../components/TripSearch';
import LoadingBar from '../components/Loading/LoadingBar';
import OrderStages from '../components/OrderStages';
import PassengersSidebar from '../components/Passengers/PassengersSidebar';
import Footer from '../components/Footer';
import PaymentForm from '../components/Payment/PaymentForm';

const PaymentPage = () => {
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
        <OrderStages stage={3} />
      </section>
      <main className="payment__main">
        <PassengersSidebar departure={departure} arrival={arrival} />
        <div className="payment-page-wrapper">
          <PaymentForm onValidate={setAllValid} />
           <div className="passenger-information__list-button">
            <Link to="/confirmation">
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
  )
}

export default PaymentPage;