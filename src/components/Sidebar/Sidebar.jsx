import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartureDate, setReturnDate } from '../../redux/slices/filterSlice';
import SidebarDirection from './SidebarDirection';

import PriceFilter from './PriceFilter';
import TimeFilter from './TimeFilter';
import LastTicketsList from '../TicketsChoice/LastTicketsList';

import DateInput from '../DateInput';
import SidebarFiltersList from './SidebarFiltersList';

const Sidebar = () => {
  const dispatch = useDispatch();

  const departureDate = useSelector(state => state.filters.departureDate);
  const returnDate = useSelector(state => state.filters.returnDate);

  const [isActiveFirst, setIsActiveFirst] = useState(false);
  const [isActiveSecond, setIsActiveSecond] = useState(false);

  const toggleFirst = () => setIsActiveFirst(prev => !prev);
  const toggleSecond = () => setIsActiveSecond(prev => !prev);

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

  return (
    <aside className="train-page__sidebar">
      <div className="train-page__filters">
        <div className="sidebar__inputs">
          <label htmlFor="sidebar-departure" className="input__label sidebar__title">Дата поездки</label>
          <DateInput
            date={departureDate ? new Date(departureDate) : null}
            onDateChange={handleDepartureChange}
            id="sidebar-departure"
            variant="sidebar"
            type="departure"
          />
          <label htmlFor="sidebar-return" className="input__label sidebar__title">Дата возвращения</label>
          <DateInput
            date={returnDate ? new Date(returnDate) : null}
            onDateChange={handleReturnChange}
            id="sidebar-return"
            variant="sidebar"
            type="return"
          />
        </div>
        <SidebarFiltersList />
        <div className="sidebar__price">
          <h2 className="price__title sidebar__title">Стоимость</h2>
          <PriceFilter />
        </div>
        <SidebarDirection
          title="Туда"
          isOpen={isActiveFirst}
          onToggle={toggleFirst}
          icon={
            <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5 0C2.23877 0 0 2.23859 0 5V21C0 23.7615 2.23877 26 5 26H27C29.7612 26 32 23.7615 32 21V5C32 2.23859 29.7612 0 27 0H5ZM17.8369 14.2238V17.3334C19.3442 15.8793 20.8667 14.4109 22.3154 13.0288L20.5205 11.2816C19.6304 10.416 18.729 9.54138 17.8223 8.66669V11.9491H9.68408V14.2238H17.8369Z" fill="#FFA800" />
            </svg>
          }
        >
          <div className="direction-full__content">
            <h3 className="direction-full__title">Время отбытия</h3>
            <div className="timefilter__wrapper timefilter__wrapper-first">
              <TimeFilter type="departure" />
            </div>
          </div>
          <div className="direction-full__content">
            <h3 className="direction-full__title direction-full__title-right">Время прибытия</h3>
            <div className="timefilter__wrapper">
              <TimeFilter type="arrival" />
            </div>
          </div>
        </SidebarDirection>
        <SidebarDirection
          title="Обратно"
          isOpen={isActiveSecond}
          onToggle={toggleSecond}
          icon={
            <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M27 0C29.7612 0 32 2.23853 32 5V21C32 23.7615 29.7612 26 27 26H5C2.23877 26 0 23.7615 0 21V5C0 2.23853 2.23877 0 5 0H27ZM14.1631 14.2236V17.3333C12.6558 15.8793 11.1333 14.4108 9.68457 13.0288C11.1479 11.6035 12.6558 10.135 14.1777 8.66663V11.949H22.3159V14.2236H14.1631Z" fill="#FFA800" />
            </svg>
          }
        >
          <div className="direction-full__content">
            <h3 className="direction-full__title">Время отбытия</h3>
            <div className="timefilter__wrapper timefilter__wrapper-first">
              <TimeFilter type="returnDeparture" />
            </div>
          </div>
          <div className="direction-full__content">
            <h3 className="direction-full__title direction-full__title-right">Время прибытия</h3>
            <div className="timefilter__wrapper">
              <TimeFilter type="returnArrival" />
            </div>
          </div>
        </SidebarDirection>
      </div>   
      <div className="train-page__last-tickets">
        <LastTicketsList />
      </div>
    </aside>
  );
};

export default Sidebar;
