import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "../styles/ReserveATableForm.css";

function ReserveATableForm() {
  // Define a stateful array for available times
  const [availableTimes] = useState([
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ]);

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

  // Form submit handler
  const handleSubmit = (values, { resetForm }) => {
    // Display a toast with enhanced design and formatted text
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
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "custom-toast",
      }
    );

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
        {() => (
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
                <Field type="date" id="date" name="date" />
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
                  {availableTimes.map((availableTime, index) => (
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

export default ReserveATableForm;
