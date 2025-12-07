import { useState, useEffect } from 'react';
import LastTicket from './LastTicket';
import { getLastTickets } from '../../api/lastTicketsApi';

const LastTicketsList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getLastTickets()
      .then(setTickets)
  }, []);

  return (
    <div className="last-tickets">
      <h2 className="last-tickets__title">последние билеты</h2>
      <ul className="last-tickets-list">
        {tickets.slice(-3).map((ticket, index) => {
          const id = ticket.departure._id;
          return <LastTicket
            key={index}
            id={id}
            departure={ticket.departure}
          />;
        })}
      </ul>
    </div>
  );
}

export default LastTicketsList;