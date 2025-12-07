import SidebarDirection from '../Sidebar/SidebarDirection';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { convertDateTime, convertDuration, convertDate } from '../../api/convertTime';
import { capitalizeFirstLetter } from '../../api/capitalizeFirstLetter';
import { formatPrice } from '../../api/formatPrice';

const PassengersSidebar = ({ departure, arrival }) => {
  const [isActiveFirst, setIsActiveFirst] = useState(false);
  const [isActiveSecond, setIsActiveSecond] = useState(false);
  const [isActiveThird, setIsActiveThird] = useState(false);

  const toggleFirst = () => setIsActiveFirst(prev => !prev);
  const toggleSecond = () => setIsActiveSecond(prev => !prev);
  const toggleThird = () => setIsActiveThird(prev => !prev);

  let departureDate = null;
  let arrivalDate = null;

  if (departure) {
    departureDate = convertDate(departure.from.datetime);
  }
  
  if (arrival) {
    arrivalDate = convertDate(arrival.from.datetime);
  }
  
  const fwdPassengers = useSelector(s => s.passengers.forward) || { adults: 0, children: 0, infants: 0 };

  const adultsCount = fwdPassengers.adults || null;
  const childrenCount = fwdPassengers.children || null;

  const fwdTotals = useSelector(s => s.totalPrice.forward) || { adultsTotal: 0, childrenTotal: 0, total: 0 };
  const bwdTotals = useSelector(s => s.totalPrice.backward) || { adultsTotal: 0, childrenTotal: 0, total: 0 };

  const adultsTotal = (fwdTotals.adultsTotal || 0) + (bwdTotals.adultsTotal || 0);
  const childrenTotal = (fwdTotals.childrenTotal || 0) + (bwdTotals.childrenTotal || 0);

  const total = adultsTotal + childrenTotal;

  const formatStr = (count, forms) => {
    const str = String(count);
    const lastTwo = parseInt(str.slice(-2), 10);
    const lastOne = parseInt(str.slice(-1), 10);

    if (lastTwo >= 11 && lastTwo <= 19) {
      return `${count} ${forms[2]}`;
    }

    if (lastOne === 1) {
      return `${count} ${forms[0]}`;
    }

    if (lastOne >= 2 && lastOne <= 4) {
      return `${count} ${forms[1]}`;
    }

    return `${count} ${forms[2]}`;
  };


  return (
    <aside className="passengers-sidebar">
      <header className="passengers-sidebar__header">
        Детали поездки
      </header>
      {departure && <SidebarDirection
        title="Туда"
        isOpen={isActiveFirst}
        onToggle={toggleFirst}
        icon={
          <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 0C2.23877 0 0 2.23859 0 5V21C0 23.7615 2.23877 26 5 26H27C29.7612 26 32 23.7615 32 21V5C32 2.23859 29.7612 0 27 0H5ZM17.8369 14.2238V17.3334C19.3442 15.8793 20.8667 14.4109 22.3154 13.0288L20.5205 11.2816C19.6304 10.416 18.729 9.54138 17.8223 8.66669V11.9491H9.68408V14.2238H17.8369Z" fill="#FFA800" />
          </svg>
        }
        date={departureDate}
      >
        <div className="ticket__direction">
          <div className="ticket__direction-content">
            <p className="directiom-content__time">{convertDateTime(departure.from.datetime)}</p>
            <p className="directiom-content__date">{convertDate(departure.from.datetime)}</p>
            <p className="direction-content__city">{capitalizeFirstLetter(departure.from.city.name)}</p>
            <p className="direction-content__station">{departure.from['railway_station_name']}</p>
          </div>
          <div className="ticket__duration">
            <div className="ticket__duration-time">{convertDuration(departure.duration)}</div>
            <svg className="ticket__duration-arrow" width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.3627 20C19.3627 17.8073 19.3627 15.3821 19.3627 12.8239C12.8621 12.8239 6.46582 12.8239 0 12.8239C0 11.0299 0 9.36877 0 7.57475C6.32677 7.57475 12.7231 7.57475 19.3279 7.57475C19.3279 4.91694 19.3279 2.42525 19.3279 0C22.9432 3.3887 26.5238 6.77741 30 10.0664C26.5585 13.2558 22.9432 16.6445 19.3627 20Z" fill="#FFA800" fillOpacity="0.79" />
            </svg>
          </div>
          <div className="ticket__direction-content right">
            <p className="directiom-content__time">{convertDateTime(departure.to.datetime)}</p>
            <p className="directiom-content__date">{convertDate(departure.to.datetime)}</p>
            <p className="direction-content__city">{capitalizeFirstLetter(departure.to.city.name)}</p>
            <p className="direction-content__station">{departure.to['railway_station_name']}</p>
          </div>
        </div>
      </SidebarDirection>}
      {arrival && <SidebarDirection
        title="Обратно"
        isOpen={isActiveSecond}
        onToggle={toggleSecond}
        icon={
          <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M27 0C29.7612 0 32 2.23853 32 5V21C32 23.7615 29.7612 26 27 26H5C2.23877 26 0 23.7615 0 21V5C0 2.23853 2.23877 0 5 0H27ZM14.1631 14.2236V17.3333C12.6558 15.8793 11.1333 14.4108 9.68457 13.0288C11.1479 11.6035 12.6558 10.135 14.1777 8.66663V11.949H22.3159V14.2236H14.1631Z" fill="#FFA800" />
          </svg>
        }
        date={arrivalDate}
      >
        <div className="ticket__direction">
          <div className="ticket__direction-content">
            <p className="directiom-content__time">{convertDateTime(arrival.to.datetime)}</p>
            <p className="directiom-content__date">{convertDate(arrival.to.datetime)}</p>
            <p className="direction-content__city">{capitalizeFirstLetter(arrival.to.city.name)}</p>
            <p className="direction-content__station">{arrival.to['railway_station_name']}</p>
          </div>
          <div className="ticket__duration">
            <div className="ticket__duration-time">{convertDuration(arrival.duration)}</div>
            <svg className="ticket__duration-arrow" width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6373 20C10.6373 17.8073 10.6373 15.3821 10.6373 12.8239C17.1379 12.8239 23.5342 12.8239 30 12.8239C30 11.0299 30 9.36877 30 7.57475C23.6732 7.57475 17.2769 7.57475 10.6721 7.57475C10.6721 4.91694 10.6721 2.42525 10.6721 0C7.05678 3.3887 3.47625 6.77741 1.90735e-06 10.0664C3.44148 13.2558 7.05678 16.6445 10.6373 20Z" fill="#FFA800" fillOpacity="0.79" />
            </svg>
          </div>
          <div className="ticket__direction-content right">
            <p className="directiom-content__time">{convertDateTime(arrival.from.datetime)}</p>
            <p className="directiom-content__date">{convertDate(arrival.from.datetime)}</p>
            <p className="direction-content__city">{capitalizeFirstLetter(arrival.from.city.name)}</p>
            <p className="direction-content__station">{arrival.from['railway_station_name']}</p>
          </div>
        </div>
      </SidebarDirection>}
      <SidebarDirection
        title="Пассажиры"
        isOpen={isActiveThird}
        onToggle={toggleThird}
        icon={
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.9721 26C17.2752 26 8.72031 26 0.165369 26C-0.219806 21.9313 -0.260351 20.3648 3.83467 18.4118C9.91638 15.5229 16.0792 15.5839 22.2014 18.4118C22.9921 18.7779 23.7219 19.2865 24.4111 19.8358C25.5058 20.7106 26.0735 21.8499 25.9924 23.2943C25.9518 24.1487 25.9721 25.0235 25.9721 26Z" fill="#FFA800" />
            <path d="M19.4841 6.44946C19.5044 10.0503 16.6054 13.0002 13.0172 13.0206C9.42899 13.0206 6.50977 10.091 6.50977 6.51049C6.50977 2.9503 9.38844 0.0411096 12.9158 0.00042166C16.5243 -0.0402663 19.4638 2.86892 19.4841 6.44946Z" fill="#FFA800" />
          </svg>
        }
      >
        <div className="passengers-wrapper">
          {adultsCount &&
            <div className="passanger-information">
              <span className="passenger-information__count">
                {formatStr(adultsCount, ['Взрослый', 'Взрослых', 'Взрослых'])}
              </span>
              <div className="passenger-information__total-wrapper">
                <span className="passenger-information__total">{formatPrice(adultsTotal)}</span>
                <span className="passenger__total-currency">₽</span>
              </div>
            </div>
          }
          {childrenCount &&
            <div className="passanger-information">
              <span className="passenger-information__count">
                {formatStr(childrenCount, ['Ребёнок', 'Ребёнка', 'Детей'])}
              </span>
              <div className="passenger-information__total-wrapper">
                <span className="passenger-information__total">{formatPrice(childrenTotal)}</span>
                <span className="passenger__total-currency">₽</span>
              </div>
            </div>
          }
        </div>
      </SidebarDirection>
      <div className="sidebar__direction-full">
        <div className="total-wrapper">
          <div className="passenger-information__total-text">Итог</div>
          <div className="passenger-information__total-wrapper">
            <span className="passenger-information__total-price">{formatPrice(total)}</span>
            <span className="total-currency">₽</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default PassengersSidebar;