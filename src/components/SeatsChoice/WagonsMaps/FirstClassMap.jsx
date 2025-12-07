import map from '../../../images/first-class-map.png';

const FirstClassMap = ({ seats, number, coachId, selectedSeats = [], onSeatClick }) => {
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
    { index: 1, x: 179.4 },
    { index: 2, x: 260.4 },
    { index: 3, x: 298.4 },
    { index: 4, x: 379.4 },
    { index: 5, x: 416.4 },
    { index: 6, x: 498.4 },
    { index: 7, x: 537.4 },
    { index: 8, x: 618.4 },
    { index: 9, x: 655.4 },
    { index: 10, x: 737.4 },
    { index: 11, x: 775.4 },
    { index: 12, x: 857.4 },
    { index: 13, x: 894.4 },
    { index: 14, x: 975.4 },
    { index: 15, x: 1014.4 },
    { index: 16, x: 1094.4 },
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
        {seatData.map(({ index, x }) => {
          const available = isAvailable(index);
          const selected = isSelected(index);
          return (
            <g
              key={index}
              transform={`translate(${x}, 40)`}
              onClick={() => handleSeatClick(index)}
              style={{ cursor: available ? 'pointer' : 'not-allowed' }}
            >
              <rect
                width="32"
                height="74"
                className={`wagon-seat ${available ? 'available' : 'unavailable'} ${selected ? 'selected' : ''}`}
                rx="2"
              />
              <text
                x="16"
                y="60"
                className="seat-number seat-number__first-class"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {index}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FirstClassMap;
