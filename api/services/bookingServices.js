/* eslint-disable camelcase */
import BookingModel from '../models/bookingModel';

const Booking = new BookingModel('bookings');

class Bookingservice {
  /** Add booking to the db
   * @description Operate on a Booking and his account
   * @param {object} a new booking object
   */

  static async addBooking(req) {
    try {
      const foundBooking = await Booking.findBooking(req.body);
      if (!foundBooking[0]) {
        throw new Error('This trip is not available');
      }
      if (foundBooking[0].status === 'cancelled') {
        throw new Error('This trip has been cancelled');
      }
      if (foundBooking.length === foundBooking[0].bus_capacity) {
        throw new Error('No more available seats on this trip');
      }
      if (req.body.seat_number > foundBooking[0].bus_capacity) {
        throw new Error(
          `This seat number doesn't exist, choose between 1-${
            foundBooking[0].bus_capacity
          }`,
        );
      }
      foundBooking.map((booking) => {
        if (booking.seat_number === req.body.seat_number) {
          throw new Error('This seat has been booked');
        }
      });
      req.body.trip_date = foundBooking[0].trip_date;
      req.body.bus_id = foundBooking[0].bus_id;
      const newBooking = await Booking.makeABooking(req.body, req.user_id);
      return newBooking;
    } catch (err) {
      throw err;
    }
  }

  static async getBookings(req) {
    try {
      
      if (req.is_admin) {
        const allBookings = await Booking.findAllBookings();
        return allBookings;
      }
      const userBookings = await Booking.findBookingByID(req.user_id);
      return userBookings;
    } catch (err) {
      throw err;
    }
  }
}

export default Bookingservice;
