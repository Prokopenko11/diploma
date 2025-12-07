import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ticket from './Ticket';
import SortDropdown from './SortDropdown';
import TicketsPerPage from './TicketsPerPage';
import Pagination from './Pagination';

import { setCurrentPage } from '../../redux/slices/paginationSlice';
import LoadingContent from '../Loading/LoadingContent';
import ModalMessage from '../ModalMessage';

const TicketsList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.tickets);
  const { from, to, departureDate, returnDate, filters } = useSelector(state => state.filters);
  const { currentPage, itemsPerPage } = useSelector(state => state.pagination);

  const [sortBy, setSortBy] = useState('time');
  const [showNoTicketsModal, setShowNoTicketsModal] = useState(false);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [sortBy, from, to, departureDate, returnDate, filters, dispatch]);

  const itemsArray = Array.isArray(items) ? items : [];

  useEffect(() => {
    if (!loading && !error && itemsArray.length === 0) {
      setShowNoTicketsModal(true);
    } else {
      setShowNoTicketsModal(false);
    }
  }, [loading, error, itemsArray.length]);

  const sortedTickets = [...itemsArray].sort((a, b) => {
    if (sortBy === 'price') return a.departure.min_price - b.departure.min_price;
    if (sortBy === 'time') return a.departure.from.datetime - b.departure.from.datetime;
    if (sortBy === 'duration') return a.departure.duration - b.departure.duration;
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedTickets.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);

  if (loading) return <LoadingContent />;

  if (error) {
    return (
      <ModalMessage
        type="error"
        title="Ошибка загрузки"
        message={error}
        onClose={() => {}}
      />
    );
  }

  return (
    <>
      {showNoTicketsModal && (
        <ModalMessage
          type="info"
          title="Нет доступных билетов"
          message="Попробуйте изменить параметры поиска."
          onClose={() => setShowNoTicketsModal(false)}
        />
      )}
      {!showNoTicketsModal && (
        <div className="tickets__wrapper">
          <div className="tickets__header">
            <span className="tickets__number">найдено {itemsArray.length}</span>
            <div className="tickets__header-right">
              <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
              <TicketsPerPage />
            </div>
          </div>
          <ul className="tickets__list">
            {currentItems.map(ticket => (
              <Ticket key={ticket.departure._id} ticket={ticket} mode="list" />
            ))}
          </ul>
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default TicketsList;
