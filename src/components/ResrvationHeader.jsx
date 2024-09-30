import ReservationHeaderImage from "../assets/reserve-a-table.jpg";

import "../styles/ReservationHeader.css";

function ReservationHeader() {
  return (
    <div id="reservation-header">
      <div id="reservation-header-content">
        <h1>Make a Reservation at Little Lemon!</h1>
        <p>
          Experience fresh flavors, cozy ambiance, and unparalleled service.
          Book your table today and enjoy a delightful dining experience!
        </p>
      </div>
      <div id="reservation-header-image">
        <img src={ReservationHeaderImage} alt="Little Lemon restaurant" />
      </div>
    </div>
  );
}

export default ReservationHeader;
