import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderNavigation from '../components/HeaderNavigation';
import TripSearch from '../components/TripSearch';
import LoadingBar from '../components/Loading/LoadingBar';
import OrderStages from '../components/OrderStages';
import PassengersSidebar from '../components/Passengers/PassengersSidebar';
import Footer from '../components/Footer';
import OrderConfirmationTicket from '../components/OrderConfirmation/OrderConfirmationTicket';
import OrderConfirmationPassengers from '../components/OrderConfirmation/OrderConfirmationPassengers';
import OrderConfirmationPayment from '../components/OrderConfirmation/OrderConfirmationPayment';

const OrderConfirmationPage = () => {
  const departure = useSelector(state => state.routes.departure);
  const arrival = useSelector(state => state.routes.arrival);

  return (
    <>
      <header id="header" className="passenger__header">
        <HeaderNavigation />
        <TripSearch />
        <LoadingBar />
      </header>
      <section className="stages">
        <OrderStages stage={4} />
      </section>
      <main className="payment__main">
        <PassengersSidebar departure={departure} arrival={arrival} />
        <div className="confirmation-page-wrapper">
          <OrderConfirmationTicket />
          <OrderConfirmationPassengers />
          <OrderConfirmationPayment />
           <div className="passenger-information__list-button">
            <Link to="/success">
              <button
                className={`next-button active`}
              >
                Подтвердить
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

export default OrderConfirmationPage;