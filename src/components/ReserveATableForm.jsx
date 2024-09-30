import { useState } from "react";
import "../styles/ReserveATableForm.css";

function ReserveATableForm() {
  // Define state for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");

  // Define a stateful array for available times
  const [availableTimes, setAvailableTimes] = useState([
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ]);

  // Form submit handler (for future API communication)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log form data to the console (replace with API call in the future)
    console.log({
      fullName,
      email,
      date,
      time,
      guests,
      occasion,
    });
    // For now, you can reset the form if needed:
    setFullName("");
    setEmail("");
    setDate("");
    setTime("");
    setGuests(1);
    setOccasion("");
  };

  return (
    <div className="reserve-form-container">
      <h1>Reserve a Table</h1>
      <form className="reserve-form" onSubmit={handleSubmit}>
        {/* Personal Details Section */}
        <div className="personal-details">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="booking-details">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <select
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">Select a Time</option>
              {availableTimes.map((availableTime, index) => (
                <option key={index} value={availableTime}>
                  {availableTime}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              name="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              required
            >
              <option value="">Select Occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Submit Reservation
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReserveATableForm;
