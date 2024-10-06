import { useReducer, useState } from "react";
import ReservationHeader from "../components/ResrvationHeader";
import ReserveATableForm from "../components/ReserveATableForm";
import BookingSlotList from "../components/BookingSlotList";

// Function to initialize available times
const initializeTimes = () => {
  return ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];
};

const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return state;
    default:
      return state;
  }
};

function Reservations() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );
  const [bookedTimes, setBookedTimes] = useState([]);

  // Handle booking submission and mark time as booked for a specific date
  const handleBooking = (date, time) => {
    setBookedTimes([...bookedTimes, { date, time }]);
  };

  return (
    <>
      <ReservationHeader />
      <BookingSlotList
        availableTimes={availableTimes}
        bookedTimes={bookedTimes}
      />
      <ReserveATableForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        handleBooking={handleBooking}
      />
    </>
  );
}

export default Reservations;
