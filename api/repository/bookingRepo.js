export default (Booking) => {
    const bookings = [
      new Booking('9782744005085','2023-02-28','2023-03-15','9782744005084','9782744005083'),
      new Booking('9782746035967','2022-12-28','2023-01-15','9782746035966','9782746035965')
    ];
    
    const listBookings = () => {
        return bookings;
      };
  
    const createBooking = (booking) => {
      bookings.push(new Booking(
        booking.id,
        booking.rentDate,
        booking.returnDate,
        booking.book,
        booking.user
      ));
      return booking;
    }
  
    const findBooking = (id) => {
      return bookings.find((booking) => booking.id === id);
    }
  
    const updateBooking = (id, booking) => {
      let foundBookingIdx = 0;
      bookings.forEach((booking, idx) => {
        if (booking.id === id) {
          foundBookingIdx = idx;
        } 
      });
      
      if (foundBookingIdx > 0) {
        bookings[foundBookingIdx] = new Booking(
            booking.id,
            booking.rentDate,
            booking.returnDate,
            booking.book,
            booking.user
        );
        return booking;
      }
      return null;
    }
  
    const deleteBooking = (id) => {
      let deletedBooking = null;
      bookings.forEach((booking, idx) => {
        if (booking.id === id) {
          deletedBooking = Object.assign({}, booking);
          bookings.splice(idx, 1);
        }
      });
      return deletedBooking;
    }
  
    return {
        listBookings,
        createBooking,
        findBooking,
        updateBooking,
        deleteBooking
    };
  };