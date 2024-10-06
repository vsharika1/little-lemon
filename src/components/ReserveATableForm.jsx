import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ReserveATableForm.css";
import { submitAPI } from "../api"; // Import submit API function

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

// Helper function to convert 24-hour time to a 12-hour format
const formatTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert to 12-hour format, use 12 for 00 hours
  return `${formattedHour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
};

// Filter available times to remove booked ones
const filterAvailableTimes = (availableTimes, bookedTimes, date) => {
  return availableTimes.filter((time) => {
    return !bookedTimes.some(
      (booked) => booked.date === date && booked.time === time
    );
  });
};

function ReserveATableForm({
  availableTimes,
  bookedTimes,
  handleBooking,
  dispatch,
}) {
  const todayDate = getTodayDate(); // Get today's date

  // Yup validation schema for form validation
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    date: Yup.date().required("Date is required."),
    time: Yup.string().required("Time is required."),
    guests: Yup.number()
      .min(1, "Guests should be at least 1.")
      .max(20, "Guests should not exceed 20.")
      .required("Number of guests is required."),
    occasion: Yup.string().required("Please select an occasion."),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const success = await submitAPI(values); // Submit data using global API function

    if (success) {
      toast.success(
        <div>
          <h3>🎉 Reservation Made Successfully!</h3>
          <p>
            <strong>Name:</strong> {values.fullName}
          </p>
          <p>
            <strong>Email:</strong> {values.email}
          </p>
          <p>
            <strong>Date:</strong> {values.date}
          </p>
          <p>
            <strong>Time:</strong> {values.time}
          </p>
          <p>
            <strong>Guests:</strong> {values.guests}
          </p>
          <p>
            <strong>Occasion:</strong> {values.occasion}
          </p>
        </div>,
        {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "custom-toast",
        }
      );

      // Book the selected time for the selected date
      handleBooking(values.date, values.time);

      // Reset form after submission
      resetForm();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="reserve-form-container">
      <h1>Reserve a Table</h1>

      {/* Toast container to display notifications */}
      <ToastContainer />

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          date: todayDate,
          time: "",
          guests: 1,
          occasion: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="reserve-form">
            {/* Personal Details Section */}
            <div className="personal-details">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johndoe@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="error-message"
                />
              </div>
            </div>

            {/* Booking Details Section */}
            <div className="booking-details">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  min={todayDate}
                  value={values.date}
                  onChange={(e) => {
                    // Dispatch an action to update available times when the date changes
                    dispatch({ type: "UPDATE_TIMES", payload: e.target.value });
                  }}
                />
                <ErrorMessage
                  name="date"
                  component="p"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <Field as="select" id="time" name="time">
                  <option value="">Select a Time</option>
                  {/* Filter and display available times, formatted to 12-hour */}
                  {filterAvailableTimes(
                    availableTimes,
                    bookedTimes,
                    values.date
                  ).map((availableTime, index) => (
                    <option key={index} value={availableTime}>
                      {formatTime(availableTime)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="time"
                  component="p"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <Field
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max="20"
                />
                <ErrorMessage
                  name="guests"
                  component="p"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="occasion">Occasion</label>
                <Field as="select" id="occasion" name="occasion">
                  <option value="">Select Occasion</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                </Field>
                <ErrorMessage
                  name="occasion"
                  component="p"
                  className="error-message"
                />
              </div>

              <button type="submit" className="submit-button">
                Submit Reservation
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

ReserveATableForm.propTypes = {
  availableTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
  bookedTimes: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired, // Make sure bookedTimes is required
  dispatch: PropTypes.func.isRequired,
  handleBooking: PropTypes.func.isRequired,
};

export default ReserveATableForm;
