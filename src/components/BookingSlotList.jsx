import BookingSlot from "./BookingSlot";
import PropTypes from "prop-types";
import "../styles/BookingSlotList.css";

// Helper function to get the next 7 days
const getNext7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    const day = nextDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const label = nextDay.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    days.push({ date: day, label });
  }
  return days;
};

// Helper function to filter today's available times (show only those that are 2 hours ahead)
const filterTodayTimes = (availableTimes, currentTime) => {
  const now = new Date(); // Current time
  return availableTimes.filter((time) => {
    const [hours, minutes] = time.split(":"); // Extract hours and minutes from time string
    const timeInMs = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    ).getTime();
    return timeInMs - currentTime >= 2 * 60 * 60 * 1000; // Only allow times 2 hours ahead
  });
};

function BookingSlotList({ availableTimes, bookedTimes }) {
  const weekDays = getNext7Days();
  const currentTime = new Date().getTime(); // Get current time in milliseconds

  return (
    <div className="booking-slot-list">
      <h2 className="booking-slot-header">
        Available Booking Slots for the Upcoming Week
      </h2>
      <div className="weekly-slots">
        {weekDays
          .filter((day) => {
            // If the date is today, filter the time slots and check if any are available
            if (day.date === new Date().toISOString().split("T")[0]) {
              const filteredTimes = filterTodayTimes(
                availableTimes,
                currentTime
              );
              return filteredTimes.length > 0; // Only show today if there are valid times
            }
            // For future dates, always show
            return true;
          })
          .map((day, dayIndex) => (
            <div key={dayIndex} className="day-slot">
              <h3>{day.label}</h3>
              <div className="time-slots">
                {availableTimes
                  .filter((time) => {
                    // If it's today, filter the available times to only show slots at least 2 hours ahead
                    if (day.date === new Date().toISOString().split("T")[0]) {
                      return filterTodayTimes(
                        availableTimes,
                        currentTime
                      ).includes(time);
                    }
                    // For future dates, return all times
                    return true;
                  })
                  .map((time, timeIndex) => {
                    // Check if the time is booked
                    const isBooked = bookedTimes.some(
                      (booked) =>
                        booked.date === day.date && booked.time === time
                    );
                    return (
                      <BookingSlot
                        key={timeIndex}
                        time={time}
                        isBooked={isBooked}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
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
