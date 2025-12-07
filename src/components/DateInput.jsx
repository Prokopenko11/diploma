import { useState, useRef, useEffect } from 'react';
import CalendarPopup from './CalendarPopup';

const DateInput = ({
  date,
  onDateChange,
  id,
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    date ? date.toLocaleDateString('ru-RU') : ''
  );

  const wrapperRef = useRef();

  useEffect(() => {
    setInputValue(date ? date.toLocaleDateString('ru-RU') : '');
  }, [date]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const submitDate = (value) => {
    if (value === '') {
      onDateChange(null);
      return;
    }

    const parts = value.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const parsedDate = new Date(`${year}-${month}-${day}`);
      const isValid =
        parsedDate instanceof Date &&
        !isNaN(parsedDate) &&
        parsedDate.getDate() === +day &&
        parsedDate.getMonth() + 1 === +month &&
        parsedDate.getFullYear() === +year;

      if (isValid) {
        onDateChange(parsedDate);
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitDate(inputValue);
      setIsOpen(false);
    }
  };

  const inputClass =
    variant === 'sidebar' ? 'sidebar__input' : 'trip-search__input';
  const wrapperClass =
    variant === 'sidebar' ? 'sidebar__input-wrapper' : 'date__input-wrapper';

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <input
        type="text"
        id={id}
        className={inputClass}
        value={inputValue}
        placeholder="ДД.ММ.ГГГГ"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen((v) => !v)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {isOpen && (
        <CalendarPopup
          date={date || new Date()}
          onChange={(newDate) => {
            onDateChange(newDate);
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DateInput;
