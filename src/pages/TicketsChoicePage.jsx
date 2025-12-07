import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import TripSearch from '../components/TripSearch';
import HeaderNavigation from '../components/HeaderNavigation';
import OrderStages from '../components/OrderStages';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import LoadingBar from '../components/Loading/LoadingBar';
import TicketsList from '../components/TicketsChoice/TicketsList';
import LoadingContent from '../components/Loading/LoadingContent';
import ModalMessage from '../components/ModalMessage';
import { fetchTickets } from '../redux/slices/ticketsSlice';

const TicketsChoicePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.tickets);
  const { from, to, departureDate, returnDate, filters } = useSelector(state => state.filters);

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [from, to, departureDate, returnDate, filters, dispatch]);

  return (
    <>
      <header id="header" className="tickets-page__header">
        <HeaderNavigation />
        <TripSearch />
        <LoadingBar />
      </header>
      <section className="stages">
        <OrderStages stage={1} />
      </section>
      {loading && <LoadingContent />}
      {error && showModal && (
        <ModalMessage
          type="error"
          title="Ошибка загрузки"
          message={error || "Не удалось загрузить данные"}
          onClose={() => setShowModal(false)}
        />
      )}
      {!loading && !error && (
        <main className="tickets-page__main">
          <Sidebar />
          <section className="tickets-page__content">
            <TicketsList />
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default TicketsChoicePage;
