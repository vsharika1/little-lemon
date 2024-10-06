import BookingSlot from "./BookingSlot";
import PropTypes from "prop-types";
import "../styles/BookingSlotList.css";

// Helper function to convert 24-hour time to a readable format
const formatTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert to 12-hour format, use 12 for 00 hours
  return `${formattedHour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
};

function BookingSlotList({ availableTimes, bookedTimes }) {
  // Get today's date in the format YYYY-MM-DD
  const todayDate = new Date().toISOString().split("T")[0];

  // Filter available times, removing booked slots
  const filteredAvailableTimes = availableTimes.filter((time) => {
    const isBooked = bookedTimes.some(
      (booked) => booked.date === todayDate && booked.time === time
    );
    return !isBooked; // Return only if not booked
  });

  return (
    <div className="booking-slot-list">
      <h2 className="booking-slot-header">Available Booking Slots for Today</h2>
      <div className="time-slots">
        {filteredAvailableTimes.length > 0 ? (
          filteredAvailableTimes.map((time, timeIndex) => {
            const isBooked = bookedTimes.some(
              (booked) => booked.date === todayDate && booked.time === time
            );
            return (
              <BookingSlot
                key={timeIndex}
                time={formatTime(time)} // Format the time to 12-hour readable format
                isBooked={isBooked}
              />
            );
          })
        ) : (
          <p className="no-slots-message">No available time slots for today</p>
        )}
      </div>
    </div>
  );
}

BookingSlotList.propTypes = {
  availableTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
  bookedTimes: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookingSlotList;
