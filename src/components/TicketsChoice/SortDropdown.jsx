import { useState, useEffect, useRef } from 'react';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const sortOptions = {
    time: 'времени',
    price: 'стоимости',
    duration: 'длительности',
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (key) => {
    onSortChange(key);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <span className="sort-dropdown__label">сортировать по:</span>
      <div className="sort-dropdown__wrapper">
        <div className="sort-dropdown__button" onClick={() => setOpen(!open)}>
          {sortOptions[currentSort]}
        </div>
        {open && (
          <ul className="sort-dropdown__menu">
            {Object.entries(sortOptions).map(([key, label]) => (
              <li
                key={key}
                className={`sort-dropdown__option ${key === currentSort ? 'active' : ''}`}
                onClick={() => handleSelect(key)}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
