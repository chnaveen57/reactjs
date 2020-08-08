import React, { Component, Fragment } from 'react';
import ToggleSwitch from '../../components/toogleSwitch/toggle_switch';
import RideHeading from '../../components/rideHeading/ride_heading';
import WayPoints from '../../components/waypointsIcon/way_points';
import Avatar from '../../assets/profilepic.jpg';
import { GetOffers, PostBooking } from '../../api/booking'
import { GetDate, DateFormat } from '../../api/get_date';
import { Link } from "react-router-dom";
import { UserWallet, UpdateBalance } from '../../api/wallet';
import bgImage from '../../assets/img4.png'
import './book_ride.scss'
import { IOfferData } from '../../Interfaces/offer'
interface BookRidesInterface {
  from: string,
  to: string,
  time: string,
  date: Date | null,
  seats: number,
  offers: Array<IOfferData>,
  showMatches: Boolean,
  bookingData: string,
}
class BookRides extends Component<{}, BookRidesInterface>{
  constructor(props = {}) {
    super(props)
    this.state = {
      from: '',
      to: '',
      time: '',
      date: null,
      seats: 0,
      offers: [],
      showMatches: false,
      bookingData: ''
    }
    this.SearchOffers = this.SearchOffers.bind(this);
  }
  componentDidMount() {
    document.body.style.backgroundImage = `url(${bgImage})`;
  }
  handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, ...{ [event.target.name]: event.target.value } });
  }
  async AddBooking(index:number) {
    const data = this.state.offers[index];
    const BookingData = JSON.parse(this.state.bookingData);
    const jsonBooking = JSON.stringify({
      "ID": JSON.parse(localStorage.getItem('user')!).userID + GetDate(),
      "UserID": JSON.parse(localStorage.getItem('user')!).userID,
      "RentalOfferID": data.ID,
      "StartingPoint": BookingData.startingPoint,
      "EndingPoint": BookingData.endingPoint,
      "SeatsNeeded": BookingData.seatsNeeded,
      "IsAccepted": false,
      "Date": BookingData.date,
      "Time": BookingData.time,
      "Cost": data.OfferPrice
    })
    const balance = await UserWallet();
    if (balance >= data.OfferPrice) {
      await UpdateBalance(data.OfferPrice, data.UserID);
      await UpdateBalance(-(data.OfferPrice), JSON.parse(localStorage.getItem('user')!).userID)
      await PostBooking(jsonBooking);
    }
    else {
      alert("Minimum balance required");
      window.location.href = "/home/profile";
    }
  }
  async SearchOffers(event:any) {
    event.preventDefault();
    const jsonData = JSON.stringify({
      "startingPoint": (this.state.from).toUpperCase(),
      "endingPoint": (this.state.to).toUpperCase(),
      "seatsNeeded": this.state.seats,
      "userId": JSON.parse(localStorage.getItem('user')!).userID,
      "date": this.state.date,
      "time": this.state.time
    });
    const Offers = await GetOffers(jsonData);
    this.setState({ offers: Offers });
    this.setState({ showMatches: true })
    this.setState({ bookingData: jsonData })
  }
  render() {
    return (
      <Fragment>
        <div className="book-rides">
          <RideHeading heading="Book a Ride" />
          <Link to="/home/offerride"><ToggleSwitch IsChecked={true} /></Link>
          <div className="book-ride-form">
            <form onSubmit={this.SearchOffers}>
              <label>From</label><br />
              <input type="text" name='from' required onChange={(event) => this.handleUserInput(event)}>
              </input><br />
              <label>To</label><br />
              <input type="text" name='to' required onChange={(event) => this.handleUserInput(event)}>
              </input><br />
              <label>Seats</label><br />
              <input type="number" min="1" name="seats" required onChange={(event) => this.handleUserInput(event)}></input><br />
              <label>Date</label><br />
              <input type="date" name='date' required onChange={(event) => this.handleUserInput(event)}></input><br />
              <label>Time</label> <br />
              <input type="radio" name="time" id="slot_1" value="5am-9am" required onChange={(event) => this.handleUserInput(event)} />
              <label className="time-slot" htmlFor="slot_1">5am-9am</label>
              <input type="radio" name="time" id="slot_2" value="9am-12pm" required onChange={(event) => this.handleUserInput(event)} />
              <label className="time-slot" htmlFor="slot_2">9am-12pm</label>
              <input type="radio" name="time" id="slot_3" value="12pm-3pm" required onChange={(event) => this.handleUserInput(event)} />
              <label className="time-slot" htmlFor="slot_3">12pm-3pm</label>
              <br />
              <input type="radio" name="time" id="slot_4" value="3pm-6pm" required onChange={(event) => this.handleUserInput(event)} />
              <label className="time-slot" htmlFor="slot_4">3pm-6pm</label>
              <input type="radio" name="time" id="slot_5" value="6pm-9pm" required onChange={(event) => this.handleUserInput(event)} />
              <label className="time-slot" htmlFor="slot_5">6pm-9pm</label>
              <br />
              <input type="submit" className="book-ride-button"></input>
            </form>
          </div>
          <div className="location-dots">
            <WayPoints display='block' />
          </div>
        </div>
        {this.state.showMatches ?
          <div className="rides">
            <h2 className="ride-match-heading">Your Matches</h2>
            {this.state.offers.map((offer, index) => (
              <div className="ride-card">
                <div className="rider-name"><h2>Naveen Nav</h2></div>
                <div className="rider-image"><img className="profile-pic" src={Avatar} alt="ProfilePic"></img></div>
                <div className="left-side">
                  <label>From</label>
                  <p className="ride-details">{offer.StartingPoint}</p>
                  <label>Date</label>
                  <p className="ride-details">{DateFormat(offer.Date)}</p>
                  <label>Price</label>
                  <p className="ride-details">₹{offer.OfferPrice}</p>
                </div>
                <div className="way-points">
                  <WayPoints display="inline-block" />
                </div>
                <div className="right-side">
                  <label>To</label>
                  <p className="ride-details">{offer.EndingPoint}</p>
                  <label>Time</label>
                  <p className="ride-details">{offer.Time}</p>
                  <label>Seats Avaialbility</label>
                  <p className="ride-details">{offer.SeatsAvailable}</p>
                </div>
                <button className="ride-request" onClick={() => this.AddBooking(index)}>Request</button>
              </div>))}
            {this.state.offers.length ? null : <h2>No Offers available</h2>}
          </div> : null
        }
      </Fragment>
    );
  }
}
export default BookRides;