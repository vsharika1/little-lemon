import { render, screen } from '@testing-library/react';
import BookingSlotList from '../components/BookingSlotList';
import '@testing-library/jest-dom'; // for additional matchers

describe('BookingSlotList Component', () => {
  const availableTimes = ['17:00', '18:30', '20:00']; // Times in 24-hour format
  const bookedTimes = [
    { date: new Date().toISOString().split('T')[0], time: '18:30' }, // One slot is booked
  ];

  it('should render available booking slots for today', () => {
    render(<BookingSlotList availableTimes={availableTimes} bookedTimes={bookedTimes} />);

    // Ensure the available slots are formatted to 12-hour format
    expect(screen.getByText('5:00 PM')).toBeInTheDocument();
    expect(screen.getByText('8:00 PM')).toBeInTheDocument();

    // Ensure the booked slot is not rendered
    expect(screen.queryByText('6:30 PM')).not.toBeInTheDocument();
  });

  it('should display "No available time slots for today" when all slots are booked', () => {
    const allBookedTimes = availableTimes.map((time) => ({
      date: new Date().toISOString().split('T')[0],
      time,
    }));

    render(<BookingSlotList availableTimes={availableTimes} bookedTimes={allBookedTimes} />);

    // Ensure the no-slots message is shown
    expect(screen.getByText('No available time slots for today')).toBeInTheDocument();
  });
});