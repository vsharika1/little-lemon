// ReserveATableForm.jsx
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ReserveATableForm.css";

const getDateLimits = () => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7); // Add 7 days to today

  const formatDate = (date) => date.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  return {
    todayDate: formatDate(today),
    maxDate: formatDate(maxDate),
    currentTime: today.getTime(), // Get current time in milliseconds
  };
};

function ReserveATableForm({ availableTimes, handleBooking }) {
  const { todayDate, maxDate, currentTime } = getDateLimits(); // Get the date and current time

  // Define Yup validation schema
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

  // Function to filter today's available times (only show slots that are 2 hours ahead)
  const filterTodayTimes = () => {
    const now = new Date(); // Current time
    return availableTimes.filter((time) => {
      const [hours, minutes] = time.split(":"); // Extract hours and minutes from the time string
      const timeInMs = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      ).getTime();
      return timeInMs - currentTime >= 2 * 60 * 60 * 1000; // Only allow if the time is 2 hours ahead
    });
  };

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
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
          date: "",
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
                  max={maxDate}
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
                  {/* Filter time slots for today if the user selects today's date */}
                  {values.date === todayDate
                    ? filterTodayTimes().map((availableTime, index) => (
                        <option key={index} value={availableTime}>
                          {availableTime}
                        </option>
                      ))
                    : availableTimes.map((availableTime, index) => (
                        <option key={index} value={availableTime}>
                          {availableTime}
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
  handleBooking: PropTypes.func.isRequired,
};

export default ReserveATableForm;
