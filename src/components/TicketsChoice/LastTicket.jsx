import ruble from '../../images/ruble.png';
import { capitalizeFirstLetter } from '../../api/capitalizeFirstLetter';
import { formatPrice } from '../../api/formatPrice';
import { Link } from 'react-router-dom';

const LastTicket = ({ id, departure }) => {
  const fromCity = departure.from.city.name;
  const fromStation = departure.from['railway_station_name'];
  const toCity = departure.to.city.name;
  const toStation = departure.to['railway_station_name'];
  const minPrice = departure['min_price'];
  const haveExpress = departure['is_express'];
  const haveWifi = departure['have_wifi'];

  return (
    <Link to={`/seats/${id}`} state={{ departure }}>
      <li className="last-ticket__item">
        <div className="last-ticket__direction">
          <div className="last-ticket__direction-content">
            <div className="direction-from__city direction__city">{capitalizeFirstLetter(fromCity)}</div>
            <div className="direction-from__station direction__station">{fromStation}</div>
          </div>
          <div className="last-ticket__direction-content">
            <div className="direction-to__city direction__city">{capitalizeFirstLetter(toCity)}</div>
            <div className="direction-to__station direction__station">{toStation}</div>
          </div>
        </div>
        <div className="last-ticket__bottom">
          <ul className="last-ticket__conveniences">
            <li className={`conveniences__item ${haveWifi ? 'have-wifi' : ''}`}></li>
            <li className={`conveniences__item ${haveExpress ? 'have-express' : ''}`}></li>
            <li className="conveniences__item conveniences__item-food"></li>
          </ul>
          <div className="last-ticket__price">от
            <span className="price__span">{formatPrice(minPrice)}</span>
            <img src={ruble} alt="ruble" />
          </div>
        </div>
      </li>
    </Link>
  )
}

export default LastTicket;