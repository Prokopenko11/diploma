import { useDispatch } from 'react-redux';
import { setSelectedTicket } from '../../redux/slices/selectedTicketSlice';
import { capitalizeFirstLetter } from '../../api/capitalizeFirstLetter';
import { formatPrice } from '../../api/formatPrice';
import { getMinPricesByClass } from '../../api/getMinMaxPrices';
import TicketTooltip from './TicketTooltip';
import { Link } from 'react-router-dom';
import { convertDuration, convertDateTime } from '../../api/convertTime';

const Ticket = ({ ticket, mode }) => {
  const dispatch = useDispatch();

  if (!ticket || !ticket.departure) {
    return null;
  }
  
  const { departure, arrival } = ticket;

  const handleSelect = () => {
    dispatch(setSelectedTicket({ departure, arrival }));
  };

  const minPrices = getMinPricesByClass(departure);

  return (
    <div className="ticket">
      <div className="ticket__name">
        <svg className="ticket__icon" width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55.7879 63.7038C56.7164 65.6856 59.433 66.369 59.5361 69C48.4635 69 37.5284 69 26.4557 69C26.6277 66.4031 29.2755 65.6856 30.2727 63.7379C29.3786 63.5329 28.5534 63.3962 27.7625 63.157C23.8423 61.9611 21.057 58.3392 21.057 54.2047C20.9882 45.389 20.9882 36.6416 21.0226 27.8601C21.0226 23.794 22.9139 20.7187 26.7308 19.3861C29.8257 18.3269 33.1268 17.6777 36.3936 17.3701C42.7896 16.7893 49.22 16.7893 55.5472 18.1219C57.1634 18.4636 58.7452 19.0444 60.1895 19.762C63.2843 21.2996 64.9005 23.9306 64.9349 27.3134C65.0037 36.3683 65.0381 45.4232 64.9349 54.478C64.9005 58.6467 61.8057 62.2003 57.748 63.2254C57.129 63.4304 56.4757 63.5329 55.7879 63.7038ZM40.1762 28.1676C35.5683 28.1676 31.0636 28.1676 26.6277 28.1676C26.6277 32.7463 26.6277 37.1884 26.6277 41.6304C31.2012 41.6304 35.6371 41.6304 40.1762 41.6304C40.1762 37.12 40.1762 32.7122 40.1762 28.1676ZM59.433 28.1676C54.8251 28.1676 50.3204 28.1676 45.8844 28.1676C45.8844 32.7463 45.8844 37.1884 45.8844 41.6304C50.4579 41.6304 54.8939 41.6304 59.433 41.6304C59.433 37.12 59.433 32.7122 59.433 28.1676ZM34.743 54.068C34.7774 51.8128 32.8861 49.9335 30.6166 49.9335C28.4158 49.9335 26.5589 51.7103 26.4901 53.8972C26.4214 56.1523 28.2439 58.0658 30.5134 58.1342C32.8174 58.1683 34.7086 56.3232 34.743 54.068ZM59.5017 53.9997C59.5017 51.7445 57.5761 49.8993 55.3065 49.9335C53.1057 49.9677 51.2832 51.7787 51.2488 53.9655C51.2144 56.2207 53.0713 58.1 55.3409 58.1342C57.6448 58.1342 59.5017 56.2548 59.5017 53.9997Z" fill="white" />
          <circle cx="43" cy="43" r="42" stroke="white" strokeWidth="2" />
        </svg>
        <div className="ticket__name-direction">{capitalizeFirstLetter(departure.from.city.name)} → <p className="direction-to">{capitalizeFirstLetter(departure.to.city.name)}</p></div>
      </div>
      <div className="ticket__directions">
        <div className="ticket__direction">
          <div className="ticket__direction-content">
            <p className="directiom-content__time">{convertDateTime(departure.from.datetime)}</p>
            <p className="direction-content__city">{capitalizeFirstLetter(departure.from.city.name)}</p>
            <p className="direction-content__station">{departure.from['railway_station_name']}</p>
          </div>
          <div className="ticket__duration">
            <div className="ticket__duration-time">{convertDuration(departure.duration)}</div>
            <svg className="ticket__duration-arrow" width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.3627 20C19.3627 17.8073 19.3627 15.3821 19.3627 12.8239C12.8621 12.8239 6.46582 12.8239 0 12.8239C0 11.0299 0 9.36877 0 7.57475C6.32677 7.57475 12.7231 7.57475 19.3279 7.57475C19.3279 4.91694 19.3279 2.42525 19.3279 0C22.9432 3.3887 26.5238 6.77741 30 10.0664C26.5585 13.2558 22.9432 16.6445 19.3627 20Z" fill="#FFA800" fillOpacity="0.79" />
            </svg>
          </div>
          <div className="ticket__direction-content">
            <p className="directiom-content__time">{convertDateTime(departure.to.datetime)}</p>
            <p className="direction-content__city">{capitalizeFirstLetter(departure.to.city.name)}</p>
            <p className="direction-content__station">{departure.to['railway_station_name']}</p>
          </div>
        </div>
        {arrival &&
          <div className="ticket__direction">
            <div className="ticket__direction-content">
              <p className="directiom-content__time">{convertDateTime(arrival.to.datetime)}</p>
              <p className="direction-content__city">{capitalizeFirstLetter(arrival.to.city.name)}</p>
              <p className="direction-content__station">{arrival.to['railway_station_name']}</p>
            </div>
            <div className="ticket__duration">
              <div className="ticket__duration-time">{convertDuration(arrival.duration)}</div>
              <svg className="ticket__duration-arrow" width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6373 20C10.6373 17.8073 10.6373 15.3821 10.6373 12.8239C17.1379 12.8239 23.5342 12.8239 30 12.8239C30 11.0299 30 9.36877 30 7.57475C23.6732 7.57475 17.2769 7.57475 10.6721 7.57475C10.6721 4.91694 10.6721 2.42525 10.6721 0C7.05678 3.3887 3.47625 6.77741 1.90735e-06 10.0664C3.44148 13.2558 7.05678 16.6445 10.6373 20Z" fill="#FFA800" fillOpacity="0.79" />
              </svg>
            </div>
            <div className="ticket__direction-content">
              <p className="directiom-content__time">{convertDateTime(arrival.from.datetime)}</p>
              <p className="direction-content__city">{capitalizeFirstLetter(arrival.from.city.name)}</p>
              <p className="direction-content__station">{arrival.from['railway_station_name']}</p>
            </div>
          </div>
        }
      </div>
      <div className="ticket__classes">
        {departure['have_fourth_class'] && (
          <div className="ticket__class tooltip-wrapper">
            <div className="ticket__class-name">Сидячий</div>
            <div className="ticket__class-count">{departure['available_seats_info'].fourth}</div>
            <div className="ticket__class-price">
              от
              <div className="ticket__price-wrapper">
                <span className="price__value">{formatPrice(minPrices.fourth)}</span>
                <span className="ticket__class-currency">₽</span>
              </div>
            </div>
            <TicketTooltip classType="fourth" priceInfo={departure.price_info} />
          </div>
        )}
        {departure['have_third_class'] && (
          <div className="ticket__class tooltip-wrapper">
            <div className="ticket__class-name">Плацкарт</div>
            <div className="ticket__class-count">{departure['available_seats_info'].third}</div>
            <div className="ticket__class-price">
              от
              <div className="ticket__price-wrapper">
                <span className="price__value">{formatPrice(minPrices.third)}</span>
                <span className="ticket__class-currency">₽</span>
              </div>
            </div>
            <TicketTooltip classType="third" priceInfo={departure.price_info} />
          </div>
        )}
        {departure['have_second_class'] && (
          <div className="ticket__class tooltip-wrapper">
            <div className="ticket__class-name">Купе</div>
            <div className="ticket__class-count">{departure['available_seats_info'].second}</div>
            <div className="ticket__class-price">
              от
              <div className="ticket__price-wrapper">
                <span className="price__value">{formatPrice(minPrices.second)}</span>
                <span className="ticket__class-currency">₽</span>
              </div>
            </div>
            <TicketTooltip classType="second" priceInfo={departure.price_info} />
          </div>
        )}
        {departure['have_first_class'] && (
          <div className="ticket__class tooltip-wrapper">
            <div className="ticket__class-name">Люкс</div>
            <div className="ticket__class-count">{departure['available_seats_info'].first}</div>
            <div className="ticket__class-price">
              от
              <div className="ticket__price-wrapper">
                <span className="price__value">{formatPrice(minPrices.first)}</span>
                <span className="ticket__class-currency">₽</span>
              </div>
            </div>
            <TicketTooltip classType="first" priceInfo={departure.price_info} />
          </div>
        )}
        <div className="spacer"></div>
        <div className="ticket__conveniences">
          {departure['have_wifi'] &&
            <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 5.05721C23.7201 5.32164 23.4402 5.58607 23.1683 5.85852C22.8964 6.13096 22.6405 6.41944 22.3525 6.73195C19.4335 3.90332 16.0027 2.41289 11.988 2.41289C7.98934 2.41289 4.57448 3.90332 1.73542 6.65182C1.16761 6.0909 0.623792 5.54601 0 4.92099C0.863712 4.24789 1.70343 3.48664 2.63912 2.86162C9.3009 -1.56161 17.89 -0.792353 23.6961 4.72066C23.7921 4.8088 23.896 4.88893 24 4.96906C24 5.00112 24 5.02516 24 5.05721Z" fill="#C4C4C4" />
              <path d="M11.6041 19C11.5001 18.9519 11.3961 18.8958 11.2842 18.8477C10.4365 18.4872 9.96461 17.5977 10.1406 16.6922C10.3165 15.7948 11.1082 15.1457 12.0279 15.1457C12.9396 15.1537 13.7314 15.8108 13.8993 16.7082C14.0672 17.6057 13.5794 18.4952 12.7237 18.8477C12.6117 18.8958 12.5078 18.9439 12.3958 18.992C12.1319 19 11.868 19 11.6041 19Z" fill="#C4C4C4" />
              <path d="M5.11028 10.0413C4.54247 9.4804 3.99865 8.94352 3.45483 8.39863C7.58946 3.9113 15.6108 3.31833 20.5371 8.35055C19.9853 8.89545 19.4255 9.44034 18.8577 10.0013C16.9863 8.20632 14.6911 7.19667 11.988 7.20468C9.29289 7.2127 7.00565 8.21433 5.11028 10.0413Z" fill="#C4C4C4" />
              <path d="M17.2023 11.7722C16.6344 12.3331 16.0906 12.878 15.5468 13.4148C13.4115 11.3955 10.3325 11.6119 8.48516 13.4068C7.94134 12.8619 7.39752 12.3251 6.8457 11.7802C9.03697 9.20797 14.0673 8.55891 17.2023 11.7722Z" fill="#C4C4C4" />
            </svg>
          }
          {departure['is_express'] &&
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.28462 17.3529C6.15402 17.357 6.07239 17.304 6.00097 17.2328C5.4908 16.7339 4.97655 16.2391 4.47047 15.7382C3.89908 15.1721 3.33586 14.5959 2.76039 14.0339C2.63183 13.9076 2.59918 13.7753 2.65019 13.6266C2.76243 13.2907 2.87467 12.9506 3.01547 12.6248C3.92153 10.5173 5.18062 8.63385 6.6948 6.91733C8.10082 5.32298 9.69662 3.9465 11.4924 2.80826C12.1291 2.40509 12.7944 2.05079 13.4453 1.67206C13.5127 1.63337 13.5412 1.66799 13.5821 1.70668C14.2187 2.34197 14.8575 2.97727 15.4942 3.6146C16.4267 4.54515 17.3593 5.47773 18.294 6.40624C18.3531 6.46529 18.3572 6.50398 18.3205 6.57728C17.5246 8.13498 16.5594 9.57865 15.4207 10.9063C14.7003 11.7452 13.9188 12.525 13.0964 13.2642C11.2108 14.9583 9.09666 16.2961 6.72949 17.2226C6.60705 17.2714 6.48053 17.3101 6.35401 17.3509C6.3234 17.3529 6.29074 17.3509 6.28462 17.3529ZM7.63146 11.1221C7.56412 11.8633 8.25183 12.3764 8.85587 12.3723C9.53541 12.3662 10.1027 11.8063 10.1007 11.1241C10.0986 10.552 9.7007 9.88001 8.75791 9.89426C8.14775 9.90444 7.63146 10.4583 7.63146 11.1221ZM12.3944 8.81507C13.1127 8.89041 13.6474 8.16552 13.6412 7.59742C13.6372 7.0171 13.129 6.34719 12.3597 6.3533C11.7455 6.35737 11.1292 6.91733 11.1557 7.6076C11.1822 8.3162 11.674 8.81507 12.3944 8.81507Z" fill="#C4C4C4" />
              <path d="M18.7653 5.61827C17.2981 4.17256 15.8288 2.72686 14.3452 1.26486C14.6289 1.15287 14.8942 1.04291 15.1635 0.941104C16.1492 0.564406 17.1613 0.29359 18.2 0.13273C18.6184 0.0675711 19.0428 0.0248108 19.4673 0.00241249C19.8836 -0.0199858 20.0019 0.110331 19.9999 0.52979C19.9958 1.24246 19.8713 1.93885 19.7183 2.63319C19.4918 3.6574 19.1734 4.65515 18.7571 5.61827C18.751 5.63049 18.7449 5.64271 18.7388 5.65289C18.7469 5.64067 18.7571 5.62845 18.7653 5.61827Z" fill="#C4C4C4" />
              <path d="M6.97031 5.98275C6.92949 6.03162 6.89276 6.08253 6.84787 6.12732C5.62551 7.39995 4.58885 8.80901 3.70728 10.3341C3.3971 10.8717 3.11957 11.4255 2.83183 11.9753C2.78694 12.0608 2.74408 12.0812 2.65021 12.0547C1.8666 11.8307 1.08298 11.6149 0.299363 11.393C0.050401 11.3217 -0.0618358 11.0835 0.0340756 10.8391C0.0646856 10.7617 0.10754 10.6864 0.152434 10.6151C1.18705 9.00245 2.54002 7.72778 4.24602 6.8461C5.06432 6.42257 5.92753 6.12325 6.83766 5.96035C6.87644 5.95425 6.91521 5.95425 6.95398 5.95221C6.9601 5.96239 6.96419 5.97257 6.97031 5.98275Z" fill="#C4C4C4" />
              <path d="M7.90088 17.188C9.01917 16.6505 10.0946 16.0457 11.117 15.3453C12.1373 14.6468 13.0883 13.8609 13.9984 13.024C14.0106 13.0321 14.0249 13.0403 14.0372 13.0484C14.029 13.1156 14.0229 13.1828 14.0106 13.25C13.7066 14.8484 12.9944 16.2514 11.9741 17.5057C11.2292 18.422 10.3538 19.1937 9.34975 19.8188C9.27017 19.8697 9.1865 19.9165 9.09875 19.9512C8.92121 20.0204 8.7498 19.9613 8.67225 19.7883C8.59471 19.6152 8.5294 19.436 8.47635 19.2548C8.28248 18.5808 8.09474 17.9048 7.90496 17.2308C7.90292 17.2226 7.90292 17.2125 7.90088 17.188Z" fill="#C4C4C4" />
              <path d="M5.23356 17.7011C5.09683 17.805 4.96419 17.9231 4.81522 18.0147C4.23159 18.3771 3.60919 18.6683 2.97046 18.9167C2.04808 19.2771 1.11753 19.6131 0.189026 19.9593C0.146172 19.9756 0.0992369 19.9837 0.0339355 20C0.10944 19.7821 0.174742 19.5846 0.246165 19.3891C0.672665 18.2163 1.10325 17.0434 1.65627 15.9215C1.83381 15.5631 2.01747 15.2068 2.28887 14.9054C2.31336 14.8789 2.33989 14.8525 2.35826 14.8321C3.31125 15.785 4.2622 16.7319 5.23356 17.7011Z" fill="#C4C4C4" />
            </svg>
          }
        </div>
        {mode === "list" ? (
          <Link
            className="ticket__button"
            onClick={handleSelect}
            to={`/seats/${departure._id}`}
            state={{ departure, arrival }}
          >
            Выбрать места
          </Link>
        ) : (
          <Link
            className="ticket__button confirmation"
            to="/tickets"
          >
            Изменить
          </Link>
        )}
      </div>
    </div>
  )
}

export default Ticket;