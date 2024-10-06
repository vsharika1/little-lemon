import { useReducer, useState } from "react";
import ReservationHeader from "../components/ResrvationHeader";
import ReserveATableForm from "../components/ReserveATableForm";
import BookingSlotList from "../components/BookingSlotList";
import { fetchAPI } from "../api"; // Adjust path if necessary

const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today); // Fetch initial times for today
};

const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES") {
    return fetchAPI(action.payload); // Fetch times for selected date
  }
  return state;
};

function Reservations() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );
  const [bookedTimes, setBookedTimes] = useState([]); // Add state for bookedTimes

  const handleBooking = (date, time) => {
    setBookedTimes([...bookedTimes, { date, time }]); // Add booking to bookedTimes
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
        bookedTimes={bookedTimes} // Pass bookedTimes to ReserveATableForm
        handleBooking={handleBooking}
        dispatch={dispatch}
      />
    </>
  );
}

export default Reservations;
