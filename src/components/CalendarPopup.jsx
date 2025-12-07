import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/calendar.css';

const CalendarPopup = ({ date, onChange, onClose }) => {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const handleChange = (newDate) => {
    onChange(newDate);
    onClose();
  };

  const tileClassName = ({ date: d, view }) => {
    if (view !== 'month') return '';
    const today = new Date();

    const isNeighbor = d.getMonth() !== activeStartDate.getMonth() || d.getFullYear() !== activeStartDate.getFullYear();
    const isSameDay = (d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate());
    const isPast = d < today && !isSameDay && !isNeighbor;
    const isSunday = d.getDay() === 0;

    return [
      isNeighbor ? 'neighbor-month' : '',
      isPast ? 'past-day' : '',
      isSunday ? 'sunday' : '',
    ].join(' ').trim();
  };

  return (
    <div className="popup-calendar">
      <Calendar
        onChange={handleChange}
        value={date}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        activeStartDate={activeStartDate}
        locale="ru-RU"
        prev2Label={null}
        next2Label={null}
        minDetail="month"
        maxDetail="month"
        formatMonthYear={(locale, dateObj) => {
          const month = dateObj.toLocaleString(locale, { month: 'long' });
          return month.charAt(0).toUpperCase() + month.slice(1);
        }}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarPopup;
