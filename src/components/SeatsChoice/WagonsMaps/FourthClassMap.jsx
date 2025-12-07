import map from '../../../images/fourth-class-map.png';

const FourthClassMap = ({ seats, number, coachId, selectedSeats = [], onSeatClick }) => {
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
    { index: 1, x: 193.6, y: 72 },
    { index: 2, x: 193.6, y: 43 },
    { index: 3, x: 253.6, y: 72 },
    { index: 4, x: 253.6, y: 43 },
    { index: 5, x: 312.6, y: 72 },
    { index: 6, x: 312.6, y: 43 },
    { index: 7, x: 370.6, y: 72 },
    { index: 8, x: 370.6, y: 43 },
    { index: 9, x: 429.6, y: 72 },
    { index: 10, x: 429.6, y: 43 },
    { index: 11, x: 487.6, y: 72 },
    { index: 12, x: 487.6, y: 43 },
    { index: 13, x: 546.6, y: 72 },
    { index: 14, x: 546.6, y: 43 },
    { index: 15, x: 605.6, y: 72 },
    { index: 16, x: 605.6, y: 43 },
    { index: 17, x: 663.6, y: 72 },
    { index: 18, x: 663.6, y: 43 },
    { index: 19, x: 722.6, y: 72 },
    { index: 20, x: 722.6, y: 43 },
    { index: 21, x: 781.4, y: 72 },
    { index: 22, x: 781.4, y: 43 },
    { index: 23, x: 840.4, y: 72 },
    { index: 24, x: 840.4, y: 43 },
    { index: 25, x: 898.4, y: 72 },
    { index: 26, x: 898.4, y: 43 },
    { index: 27, x: 957.4, y: 72 },
    { index: 28, x: 957.4, y: 43 },
    { index: 29, x: 1016.4, y: 72 },
    { index: 30, x: 1016.4, y: 43 },
    { index: 31, x: 1075.4, y: 72 },
    { index: 32, x: 1075.4, y: 43 },
    { index: 33, x: 193.6, y: 152 },
    { index: 34, x: 253.6, y: 123 },
    { index: 35, x: 253.6, y: 152 },
    { index: 36, x: 312.6, y: 123 },
    { index: 37, x: 312.6, y: 152 },
    { index: 38, x: 370.6, y: 123 },
    { index: 39, x: 370.6, y: 152 },
    { index: 40, x: 429.6, y: 123 },
    { index: 41, x: 429.6, y: 152 },
    { index: 42, x: 487.6, y: 123 },
    { index: 43, x: 487.6, y: 152 },
    { index: 44, x: 546.6, y: 123 },
    { index: 45, x: 546.6, y: 152 },
    { index: 46, x: 605.6, y: 123 },
    { index: 47, x: 605.6, y: 152 },
    { index: 48, x: 663.6, y: 123 },
    { index: 49, x: 663.6, y: 152 },
    { index: 50, x: 722.6, y: 123 },
    { index: 51, x: 722.6, y: 152 },
    { index: 52, x: 781.4, y: 123 },
    { index: 53, x: 781.4, y: 152 },
    { index: 54, x: 840.4, y: 123 },
    { index: 55, x: 840.4, y: 152 },
    { index: 56, x: 898.4, y: 123 },
    { index: 57, x: 898.4, y: 152 },
    { index: 58, x: 957.4, y: 123 },
    { index: 59, x: 957.4, y: 152 },
    { index: 60, x: 1016.4, y: 123 },
    { index: 61, x: 1016.4, y: 152 },
    { index: 62, x: 1075.4, y: 152 },
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
                height="24"
                className={`wagon-seat ${available ? 'available' : 'unavailable'} ${selected ? 'selected' : ''}`}
                rx="2"
              />
              <text
                x="16"
                y="13"
                className="seat-number seat-number__fourth-class"
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

export default FourthClassMap;
