import React, { Component } from 'react';
import './my_rides.scss';
import RideCard from '../../components/rideCard/ride_card'
import { GetOffers } from '../../api/offer';
import { GetBookings } from '../../api/booking';
import bgImage from '../../assets/img4.png'
import { IOfferData } from '../../Interfaces/offer'
import { IBookingData } from '../../Interfaces/booking'
interface MyRidesInterface {
  offers: Array<IOfferData>,
  bookings: Array<IBookingData>,
}
class MyRides extends Component<{}, MyRidesInterface> {
  constructor(props = {}) {
    super(props)
    this.state = {
      offers: [],
      bookings: []
    }
  }
  async componentDidMount() {
    var offersData = await GetOffers();
    var bookingData = await GetBookings();
    this.setState({ offers: offersData });
    this.setState({ bookings: bookingData });
    document.body.style.backgroundImage = `url(${bgImage})`;
  }
  render() {
    return (
      <div className="my-rides">
        <div className="booked-rides">
          <div className="booked-ride-heading">
            Booked rides
          </div>
          {this.state.bookings.map((booking) => (
            <RideCard data={booking} type="booking" />
          ))}
          {this.state.bookings.length ? null : <h2>NO BOOKINGS</h2>}
        </div>
        <div className="offered-rides">
          <div className="offered-ride-heading">
            Offered rides
          </div>
          {this.state.offers.map((offer) => (
            <RideCard data={offer} type="offer" />
          ))}
          {this.state.offers.length ? null : <h2>NO OFFERS</h2>}
        </div>
      </div>
    );
  }
}
export default MyRides;