import { useSelector } from 'react-redux';
import Ticket from '../TicketsChoice/Ticket';

const OrderConfirmationTicket = () => {
  const selected = useSelector(state => state.selectedTicket);

  return (
    <div className="order-confirmation-ticket">
      <header className="order-confirmation__header">
        <h2 className="order-confirmation-title">Поезд</h2>
      </header>
      <div className="order-confirmation-ticket__content">
        <Ticket ticket={selected} mode="review" />
      </div>
    </div>
  )
}

export default OrderConfirmationTicket;