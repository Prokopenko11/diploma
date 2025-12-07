import errorSign from '../images/error-sign.png';
import infoSign from '../images/info-sign.png';

const ModalMessage = ({ type = 'error', title, message, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-message__overlay')) {
      onClose();
    }
  };

  const icons = {
    error: errorSign,
    info: infoSign,
  };

  return (
    <div className={`modal-message__overlay`} onClick={handleOverlayClick}>
      <div className={`modal-message modal-message__${type}`}>
        <div className="modal-message__header">
          <img src={icons[type]} alt={`${type}-sign`} />
        </div>
        <div className="modal-message__content">
          <p className="modal-message__title">{title}</p>
          <p className="modal-message__text">{message}</p>
        </div>
        <div className="modal-message__button-wrapper">
          <button className="modal-message__button" onClick={onClose}>Понятно</button>
        </div>
      </div>
    </div>
  )
}

export default ModalMessage;