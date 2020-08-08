import React, { Component } from 'react';
import ToggleSwitch from '../../components/toogleSwitch/toggle_switch';
import RideHeading from '../../components/rideHeading/ride_heading';
import WayPoints from '../../components/waypointsIcon/way_points';
import { GetDate } from '../../api/get_date';
import { PostOffer } from '../../api/offer'
import { Link } from 'react-router-dom';
import bgImage from '../../assets/img4.png'
import './offer_ride.scss'
import { IVehicleData } from '../../Interfaces/vehicle'
interface OfferRideInterface {
  from: string,
  to: string,
  time: string,
  date: Date | null,
  seats: number,
  inputs: Array<any>,
  count: number,
  show: Boolean,
  price: number,
  vehicle: Array<IVehicleData>,
  vehicleID: string,
}
class OfferRides extends Component<{}, OfferRideInterface> {
  constructor(props = {}) {
    super(props)
    this.state = {
      from: '',
      to: '',
      time: '',
      date: null,
      seats: 0,
      inputs: [1],
      count: 1,
      show: false,
      price: 0,
      vehicle: [],
      vehicleID: JSON.parse(localStorage.getItem('vehicle')!).vehicles[0].ID
    }
    this.AddOffer = this.AddOffer.bind(this);
    this.showViaPoints = this.showViaPoints.bind(this);
    this.addInput=this.addInput.bind(this);
  }
  componentDidMount() {
    var data = JSON.parse(localStorage.getItem('vehicle')!).vehicles;
    console.log(this.state.vehicleID);
    this.setState({ vehicle: data });
    document.body.style.backgroundImage = `url(${bgImage})`;
  }
  addInput() {
    this.setState({
        inputs: [...this.state.inputs, this.state.count + 1],});
    this.setState({count:this.state.count+1});
  }
  showViaPoints(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    this.setState({ show: true })
  }
  handleUserInput(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, ...{ [event.target.name]: event.target.value } });
  }
  handleText = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputs = [...this.state.inputs]
    inputs[i] = e.target.value
    this.setState({
      inputs
    })
  }
  AddOffer(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    const offerID = JSON.parse(localStorage.getItem('user')!).userID + GetDate();
    var i, len, viapoints;
    for (i = 0, len = this.state.inputs.length, viapoints = ""; i < len; i++) {
      if (i === len - 1)
        viapoints += (this.state.inputs[i]).toUpperCase();
      else
        viapoints += (this.state.inputs[i]).toUpperCase() + ','
    }
    const offerJson = JSON.stringify({
      "ID": offerID,
      "UserID": JSON.parse(localStorage.getItem('user')!).userID,
      "VehicleID": this.state.vehicleID,
      "StartingPoint": (this.state.from).toUpperCase(),
      "EndingPoint": (this.state.to).toUpperCase(),
      "ViaPoints": viapoints,
      "SeatsAvailable": this.state.seats,
      "MoneyRecieved": 0,
      "IsClosed": false,
      "Date": this.state.date,
      "Time": this.state.time,
      "OfferPrice": this.state.price
    }
    );
    PostOffer(offerJson);
  }
  render() {
    return (
      <div>
        <div className="book-rides">
          <RideHeading heading="Offer a Ride" />
          <Link to="/home/bookride"><ToggleSwitch IsChecked={false} /></Link>
          <div className="book-ride-form">
            <form onSubmit={this.showViaPoints}>
              <label>From</label><br />
              <input type="text" name='from' required onChange={(event) => this.handleUserInput(event)}>
              </input><br />
              <label>To</label><br />
              <input type="text" name='to' required onChange={(event) => this.handleUserInput(event)}>
              </input><br />
              <label>Select Vehicle</label><br />
              <select name="vehicleID" onChange={(event) => this.handleUserInput(event)}>
                {this.state.vehicle.map((vehicle) => (
                  <option value={vehicle.ID}>{vehicle.ID}</option>
                ))}
              </select><br />
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
              <button type='submit' className="next-button">Next{">>"}</button>
            </form>
          </div>
          <div className="location-dots">
            <WayPoints display="block" />
          </div>
        </div>
        {this.state.show ?
          <form onSubmit={this.AddOffer}>
            <div className="via-points">
              <RideHeading heading="Offer a Ride" />
              <ToggleSwitch IsChecked={false} />
              <div className="book-ride-form">
                {this.state.inputs.map((node, index) => {
                  if (index + 1 === this.state.count)
                    return <div><label>Stop{index + 1}</label><br />
                      <input type="text" required onChange={this.handleText(index)}>
                      </input><i onClick={this.addInput} className="fa add-stop">&#xf067;</i><br /></div>
                  else
                    return <div><label>Stop{index + 1}</label><br />
                      <input type="text" required onChange={this.handleText(index)}></input></div>
                }
                )}
                <div className="available-seats">
                  <label>Available Seats</label><br />
                  <input type="radio" name="seats" id="seats_1" value="1" onChange={(event) => this.handleUserInput(event)} />
                  <label className="seats" htmlFor="seats_1">1</label>
                  <input type="radio" name="seats" id="seats_2" value="2" onChange={(event) => this.handleUserInput(event)} />
                  <label className="seats" htmlFor="seats_2">2</label>
                  <input type="radio" name="seats" id="seats_3" value="3" onChange={(event) => this.handleUserInput(event)} />
                  <label className="seats" htmlFor="seats_3">3</label>
                </div>
                <div className="ride-price">
                  <label>Price</label><br />
                  <input className="ride-money" type="number" name="price" step='0.01' min='0' required onChange={(event) => this.handleUserInput(event)} /><br />
                </div>
                <button className="yellow-button" type="submit">submit</button>
              </div>
            </div> </form> : null
        }
      </div>
    );
  }
}
export default OfferRides;