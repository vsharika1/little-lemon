import { render, screen, fireEvent } from "@testing-library/react";
import ReserveATableForm from "./ReserveATableForm";
import "@testing-library/jest-dom";
import { submitAPI } from "../api";

// Mock the submitAPI function to simulate API submission
jest.mock("../api", () => ({
  submitAPI: jest.fn(() => Promise.resolve(true)), // Mock to resolve with success
}));

describe("ReserveATableForm Component", () => {
  const availableTimes = ["17:00", "18:30", "20:00"];
  const bookedTimes = [
    { date: new Date().toISOString().split("T")[0], time: "18:30" }, // One slot is booked
  ];
  const mockDispatch = jest.fn();
  const mockHandleBooking = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it("renders the form correctly with the available times", () => {
    render(
      <ReserveATableForm
        availableTimes={availableTimes}
        bookedTimes={bookedTimes}
        dispatch={mockDispatch}
        handleBooking={mockHandleBooking}
      />
    );

    // Check that the form fields are rendered
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();

    // Check that the available times are displayed in the dropdown, excluding booked times
    expect(screen.getByText("5:00 PM")).toBeInTheDocument();
    expect(screen.getByText("8:00 PM")).toBeInTheDocument();
    expect(screen.queryByText("6:30 PM")).not.toBeInTheDocument(); // Booked time should not appear
  });

  it("submits the form with valid data and displays success toast", async () => {
    render(
      <ReserveATableForm
        availableTimes={availableTimes}
        bookedTimes={bookedTimes}
        dispatch={mockDispatch}
        handleBooking={mockHandleBooking}
      />
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "johndoe@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: new Date().toISOString().split("T")[0] },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: "17:00" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: "Birthday" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit Reservation/i));

    // Ensure the API is called with the correct values
    expect(submitAPI).toHaveBeenCalledWith({
      fullName: "John Doe",
      email: "johndoe@email.com",
      date: new Date().toISOString().split("T")[0],
      time: "17:00",
      guests: 2,
      occasion: "Birthday",
    });

    // Check that the booking handler is called with the correct arguments
    expect(mockHandleBooking).toHaveBeenCalledWith(
      new Date().toISOString().split("T")[0],
      "17:00"
    );
  });

  it("displays validation errors if the form is submitted with missing fields", async () => {
    render(
      <ReserveATableForm
        availableTimes={availableTimes}
        bookedTimes={bookedTimes}
        dispatch={mockDispatch}
        handleBooking={mockHandleBooking}
      />
    );

    // Submit the form without filling in any data
    fireEvent.click(screen.getByText(/Submit Reservation/i));

    // Expect validation errors for required fields
    expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Time is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Number of guests is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Please select an occasion/i)).toBeInTheDocument();
  });
});
