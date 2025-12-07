import { useEffect, useState, useRef } from 'react';
import { getCitiesByName } from '../api/citiesApi';

const DirectionFilter = ({ from, to, onFromChange, onToChange }) => {
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (from) getCitiesByName(from).then(setSuggestionsFrom);
    }, 300);
    return () => clearTimeout(timeout);
  }, [from]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (to) getCitiesByName(to).then(setSuggestionsTo);
    }, 300);
    return () => clearTimeout(timeout);
  }, [to]);

  const handleSelect = (name, isFrom) => {
    if (isFrom) {
      onFromChange(name);
      setSuggestionsFrom([]);
    } else {
      onToChange(name);
      setSuggestionsTo([]);
    }
    setActiveField(null);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="trip-search__direction" ref={wrapperRef}>
      <h2 className="trip-search__title">Направление</h2>
      <div className="trip-search__inputs direction__inputs">
        <div className="direction__input-wrapper">
          <input
            type="text"
            className="trip-search__input direction__input"
            placeholder="Откуда"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            onFocus={() => {
              setActiveField('from');
              if (!from) getCitiesByName('а').then(setSuggestionsFrom);
            }}
            required
          />
          {activeField === 'from' && suggestionsFrom.length > 0 && (
            <ul className="suggestions__list">
              {suggestionsFrom.slice(0, 9).map((city) => (
                <li className="suggestions__item" key={city._id} onClick={() => handleSelect(city.name, true)}>
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          className="trip-search__reverse"
          onClick={() => {
            onFromChange(to);
            onToChange(from);
          }}
        />
        <div className="direction__input-wrapper">
          <input
            type="text"
            className="trip-search__input direction__input"
            placeholder="Куда"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            onFocus={() => {
              setActiveField('to');
              if (!to) getCitiesByName('а').then(setSuggestionsTo);
            }}
            required
          />
          {activeField === 'to' && suggestionsTo.length > 0 && (
            <ul className="suggestions__list">
              {suggestionsTo.slice(0, 9).map((city) => (
                <li className="suggestions__item" key={city._id} onClick={() => handleSelect(city.name, false)}>
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectionFilter;
