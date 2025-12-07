import map from '../../../images/second-class-map.png';

const SecondClassMap = ({ seats, number, coachId, selectedSeats = [], onSeatClick }) => {
  const isAvailable = (index) => {
    const seat = seats.find(seat => seat.index === index);
    return seat?.available;
  };

  const isSelected = (index) => {
    return selectedSeats.some(seat => seat.index === index);
  };

  const handleSeatClick = (index) => {
    const seat = seats.find(seat => seat.index === index);
    if (seat?.available) {
      onSeatClick({ ...seat, coach_id: coachId });
    }
  };

  const seatData = [
    { index: 1, x: 179.4, y: 79 },
    { index: 2, x: 179.4, y: 40 },
    { index: 3, x: 260.4, y: 79 },
    { index: 4, x: 260.4, y: 40 },
    { index: 5, x: 299.4, y: 79 },
    { index: 6, x: 299.4, y: 40 },
    { index: 7, x: 380.4, y: 79 },
    { index: 8, x: 380.4, y: 40 },
    { index: 9, x: 418.4, y: 79 },
    { index: 10, x: 418.4, y: 40 },
    { index: 11, x: 498.4, y: 79 },
    { index: 12, x: 498.4, y: 40 },
    { index: 13, x: 538.4, y: 79 },
    { index: 14, x: 538.4, y: 40 },
    { index: 15, x: 617.4, y: 79 },
    { index: 16, x: 617.4, y: 40 },
    { index: 17, x: 656.4, y: 79 },
    { index: 18, x: 656.4, y: 40 },
    { index: 19, x: 737.4, y: 79 },
    { index: 20, x: 737.4, y: 40 },
    { index: 21, x: 775.4, y: 79 },
    { index: 22, x: 775.4, y: 40 },
    { index: 23, x: 856.4, y: 79 },
    { index: 24, x: 856.4, y: 40 },
    { index: 25, x: 894.4, y: 79 },
    { index: 26, x: 894.4, y: 40 },
    { index: 27, x: 976.4, y: 79 },
    { index: 28, x: 976.4, y: 40 },
    { index: 29, x: 1014.4, y: 79 },
    { index: 30, x: 1014.4, y: 40 },
    { index: 31, x: 1094.4, y: 79 },
    { index: 32, x: 1094.4, y: 40 },
  ];

  return (
    <div className="wagon-map">
      <img src={map} alt="map" className="map-image" />
      <svg viewBox="0 0 1228 193.33333" className="seat-overlay">
        <g transform={`translate(52.403273, -0.48975021)`}>
          <rect
            width="45.54677"
            height="32.323514"
            className="wagon-map__number"
            rx="0"
          />
          <text
            x="23"
            y="16"
            className="wagon-number"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {number}
          </text>
        </g>
        {seatData.map(({ index, x, y }) => {
          const available = isAvailable(index);
          const selected = isSelected(index);
          return (
            <g
              key={index}
              transform={`translate(${x}, ${y})`}
              onClick={() => handleSeatClick(index)}
              style={{ cursor: available ? 'pointer' : 'not-allowed' }}
            >
              <rect
                width="32"
                height="36"
                className={`wagon-seat ${available ? 'available' : 'unavailable'} ${selected ? 'selected' : ''}`}
                rx="2"
              />
              <text
                x="16"
                y="18"
                className="seat-number seat-number__second-class"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {index}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  );
};

export default SecondClassMap;
