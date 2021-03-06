/* eslint-disable camelcase */
import Query from '../utilities/psqlUtilities';

class Booking extends Query {
  
  async makeABooking(req, id) {
    const trip_datetime = req.trip_date;
    const formatted_date = `${trip_datetime.getFullYear()
    }-${
      trip_datetime.getMonth() + 1
    }-${
      trip_datetime.getDate()
    } ${
      trip_datetime.getHours()
    }:${
      trip_datetime.getMinutes()
    }:${
      trip_datetime.getSeconds()}`;

    try {
      const { rows } = await this.insertWithSelect(
        'user_id, trip_id, bus_id, trip_date, departure_time, seat_number, created_on, first_name, last_name, email',
        `${id}, ${req.trip_id}, ${req.bus_id}, '${formatted_date}', '${req.departure_time}', ${
          req.seat_number
        }, NOW()`,
        'first_name, last_name, email',
        'users',
        'user_id',
        id,
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async findBooking(req) {
    try {
      const { rows } = await this.findTripBooking('trip_id', 'trips',
        [req.trip_id]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findAllBookings() {
    try {
      const { rows } = await this.findAll('*');
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findBookingByID(id) {
    try {
      const { rows } = await this.findByOneParam('user_id', [id]);
      return rows;
    } catch (err) {
      throw err;
    }
  }
}

export default Booking;
