import PropTypes from "prop-types";
import "../styles/BookingSlot.css";

function BookingSlot({ time, isBooked }) {
  return (
    <div className={`booking-slot ${isBooked ? "booked" : "available"}`}>
      <span>{time}</span>
      {isBooked && <span className="status">(Booked)</span>}
    </div>
  );
}

BookingSlot.propTypes = {
  time: PropTypes.string.isRequired,
  isBooked: PropTypes.bool.isRequired,
};

export default BookingSlot;