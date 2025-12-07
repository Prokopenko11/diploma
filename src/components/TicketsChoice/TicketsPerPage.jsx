import { useDispatch, useSelector } from 'react-redux';
import { setItemsPerPage, setCurrentPage } from '../../redux/slices/paginationSlice';

const TicketsPerPage = () => {
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(state => state.pagination.itemsPerPage);
  const totalTickets = useSelector(state => state.tickets.items.length);

  const baseOptions = [5, 10, 20];
  const options = baseOptions.filter((opt) => opt <= totalTickets);

  if (options.length === 0 && totalTickets > 0) {
    options.push(totalTickets);
  }

  const handleChange = (n) => {
    dispatch(setItemsPerPage(n));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="tickets-per-page">
      <span>показывать по: </span>
      <div className="tickets-per-page__buttons">
        {options.map((n) => (
          <button
            key={n}
            onClick={() => handleChange(n)}
            className={`tickets-per-page__button ${itemsPerPage === n ? 'active' : ''}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketsPerPage;
