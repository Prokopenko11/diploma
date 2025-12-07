export const calculateTotalPrice = ({
  selectedSeats,
  coach,
  passengers,
  selectedOptions = {},
}) => {
  const {
    class_type,
    top_price,
    bottom_price,
    side_price,
    linens_price,
    wifi_price,
    is_linens_included,
    have_wifi,
  } = coach.coach;

  let total = 0;
  let adultsTotal = 0;
  let childrenTotal = 0;

  selectedSeats.forEach((seat, idx) => {
    let seatPrice = 0;

    if (class_type === 'third') {
      if (seat.index >= 33) {
        seatPrice = side_price;
      } else if (seat.index % 2 === 0) {
        seatPrice = top_price;
      } else {
        seatPrice = bottom_price;
      }
    } else if (class_type === 'second') {
      seatPrice = seat.index % 2 === 0 ? top_price : bottom_price;
    } else if (class_type === 'first') {
      seatPrice = bottom_price;
    } else if (class_type === 'fourth') {
      seatPrice = top_price;
    }

    const isChild = idx < passengers.children;

    if (isChild) {
      seatPrice *= 0.4;
    }

    if (have_wifi && wifi_price > 0 && selectedOptions.wifi) {
      seatPrice += wifi_price;
    }

    if (!is_linens_included && linens_price > 0 && selectedOptions.linens) {
      seatPrice += linens_price;
    }
    const rounded = Math.round(seatPrice);

    total += rounded;
    if (isChild) {
      childrenTotal += rounded;
    } else {
      adultsTotal += rounded;
    }
  });

  return {
    total,
    adultsTotal,
    childrenTotal,
  };
};
