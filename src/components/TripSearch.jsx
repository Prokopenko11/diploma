import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartureDate, setReturnDate } from '../redux/slices/filterSlice';
import { initiateSearch, resetSearch } from '../redux/slices/searchTicketsSlice';
import DirectionFilter from './DirectionFilter';
import DateInput from './DateInput';
import { fetchTickets } from '../redux/slices/ticketsSlice';
import { setFrom, setTo, resetPriceRange, resetTime } from '../redux/slices/filterSlice'
import ModalMessage from './ModalMessage';

const TripSearch = () => {
  const { pathname } = useLocation();
  const isHorizontalLayout = pathname !== '/';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const departureDate = useSelector(state => state.filters.departureDate);
  const returnDate = useSelector(state => state.filters.returnDate);

  const globalFrom = useSelector(state => state.filters.from);
  const globalTo = useSelector(state => state.filters.to);

  const [localFrom, setLocalFrom] = useState(globalFrom);
  const [localTo, setLocalTo] = useState(globalTo);

  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorText, setErrorText] = useState('');

  const toLocalDateString = (date) => {
    if (date instanceof Date) {
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - offset * 60000);
      return localDate.toISOString().split('T')[0];
    }
  };

  const handleDepartureChange = (date) => {
    const formatted = toLocalDateString(date);
    dispatch(setDepartureDate(formatted));
  };

  const handleReturnChange = (date) => {
    const formatted = toLocalDateString(date);
    dispatch(setReturnDate(formatted));
  };

  const handleSearch = () => {
    if (localFrom == '') {
      setError(true);
      setErrorName('Не указан город отправления');
      setErrorText('Чтобы продолжить поиск необходимо ввести город отправления')
      return;
    }

    if (localTo == '') {
      setError(true);
      setErrorName('Не указан город прибытия');
      setErrorText('Чтобы продолжить поиск необходимо ввести город прибытия')
      return;
    }

    setError(false);

    dispatch(setFrom(localFrom));
    dispatch(setTo(localTo));
    dispatch(resetSearch());
    dispatch(initiateSearch());
    dispatch(resetPriceRange());
    dispatch(resetTime());
    dispatch(fetchTickets());
    navigate('/tickets');
  };

  return (
    <form
      className={`trip-search ${isHorizontalLayout ? 'trip-search__horizontal' : ''}`}
    >
      <div className={`trip-search__wrapper ${isHorizontalLayout ? 'wrapper__horizontal' : ''}`}>
        <DirectionFilter
          from={localFrom}
          to={localTo}
          onFromChange={setLocalFrom}
          onToChange={setLocalTo}
        />
        <div className="trip-search__date">
          <h2 className="trip-search__title">Дата</h2>
          <div className="trip-search__inputs">
            <DateInput
              date={departureDate ? new Date(departureDate) : null}
              onDateChange={handleDepartureChange}
              id="trip-search-departure"
              variant="search"
              type="departure"
            />
            <DateInput
              date={returnDate ? new Date(returnDate) : null}
              onDateChange={handleReturnChange}
              id="trip-search-return"
              variant="search"
              type="return"
            />
          </div>
        </div>
      </div>
      <button type="button" onClick={handleSearch} className={`trip-search__btn ${isHorizontalLayout ? 'tickets-page__btn' : ''}`}>
        найти билеты
      </button>
      {error && <ModalMessage type="error" title={errorName} message={errorText} onClose={() => setError(false)} />}
    </form>
  );
};

export default TripSearch;
