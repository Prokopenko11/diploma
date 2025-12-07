import map from '../../../images/third-class-map.png';

const ThirdClassMap = ({ seats, number, coachId, selectedSeats = [], onSeatClick }) => {
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
    { index: 1, x: 134.5, y: 61, w: 25, h: 29.5 },
    { index: 2, x: 134.5, y: 29, w: 25, h: 31 },
    { index: 3, x: 194, y: 61, w: 25, h: 29.5 },
    { index: 4, x: 194, y: 29, w: 25, h: 31 },
    { index: 5, x: 224.5, y: 61, w: 25, h: 29.5 },
    { index: 6, x: 224.5, y: 29, w: 25, h: 31 },
    { index: 7, x: 283.5, y: 61, w: 25, h: 29.5 },
    { index: 8, x: 283.5, y: 29, w: 25, h: 31 },
    { index: 9, x: 313.5, y: 61, w: 25, h: 29.5 },
    { index: 10, x: 313.5, y: 29, w: 25, h: 31 },
    { index: 11, x: 373.5, y: 61, w: 25, h: 29.5 },
    { index: 12, x: 373.5, y: 29, w: 25, h: 31 },
    { index: 13, x: 403.5, y: 61, w: 25, h: 29.5 },
    { index: 14, x: 403.5, y: 29, w: 25, h: 31 },
    { index: 15, x: 461.5, y: 61, w: 25, h: 29.5 },
    { index: 16, x: 461.5, y: 29, w: 25, h: 31 },
    { index: 17, x: 492, y: 61, w: 25, h: 29.5 },
    { index: 18, x: 492, y: 29, w: 25, h: 31 },
    { index: 19, x: 551.5, y: 61, w: 25, h: 29.5 },
    { index: 20, x: 551.5, y: 29, w: 25, h: 31 },
    { index: 21, x: 582, y: 61, w: 25, h: 29.5 },
    { index: 22, x: 582, y: 29, w: 25, h: 31 },
    { index: 23, x: 641, y: 61, w: 25, h: 29.5 },
    { index: 24, x: 641, y: 29, w: 25, h: 31 },
    { index: 25, x: 671, y: 61, w: 25, h: 29.5 },
    { index: 26, x: 671, y: 29, w: 25, h: 31 },
    { index: 27, x: 731, y: 61, w: 25, h: 29.5 },
    { index: 28, x: 731, y: 29, w: 25, h: 31 },
    { index: 29, x: 761, y: 61, w: 25, h: 29.5 },
    { index: 30, x: 761, y: 29, w: 25, h: 31 },
    { index: 31, x: 821, y: 61, w: 25, h: 29.5 },
    { index: 32, x: 821, y: 29, w: 25, h: 31 },
    { index: 33, x: 134.5, y: 114.3, w: 42, h: 22 },
    { index: 34, x: 177.5, y: 114.3, w: 42, h: 22 },
    { index: 35, x: 224.5, y: 114.3, w: 40.5, h: 22 },
    { index: 36, x: 267.5, y: 114.3, w: 40, h: 22 },
    { index: 37, x: 313.5, y: 114.3, w: 41, h: 22 },
    { index: 38, x: 356, y: 114.3, w: 42, h: 22 },
    { index: 39, x: 403.8, y: 114.3, w: 40, h: 22 },
    { index: 40, x: 445.8, y: 114.3, w: 41, h: 22 },
    { index: 41, x: 492.8, y: 114.3, w: 42, h: 22 },
    { index: 42, x: 536.8, y: 114.3, w: 41, h: 22 },
    { index: 43, x: 582.5, y: 114.3, w: 41, h: 22 },
    { index: 44, x: 625, y: 114.3, w: 41, h: 22 },
    { index: 45, x: 671.5, y: 114.3, w: 41, h: 22 },
    { index: 46, x: 715, y: 114.3, w: 41, h: 22 },
    { index: 47, x: 762, y: 114.3, w: 41, h: 22 },
    { index: 48, x: 805, y: 114.3, w: 40, h: 22 },
  ];

  return (
    <div className="wagon-map">
      <img src={map} alt="map" className="map-image" />
      <svg viewBox="0 0 921 145" className="seat-overlay">
        <g transform="translate(38.945854, 0.69261139)">
          <rect
            width="35.02"
            height="25.47"
            className="wagon-map__number"
            rx="0"
          />
          <text
            x="17"
            y="13"
            className="wagon-number"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {number}
          </text>
        </g>
        {seatData.map(({ index, x, y, w, h }) => {
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
                width={w}
                height={h}
                className={`wagon-seat ${available ? 'available' : 'unavailable'} ${selected ? 'selected' : ''}`}
                rx="2"
              />
              <text
                x={w / 2}
                y={h / 2}
                className="seat-number seat-number__third-class"
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

export default ThirdClassMap;
