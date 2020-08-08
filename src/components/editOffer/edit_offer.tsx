import React, { Component } from 'react';
import './edit_offer.scss';
import { YearDateFormat } from '../../api/get_date'
import { UpdateOffer } from '../../api/offer';
import { DeleteOfferBooking } from '../../api/booking';
import { IVehicleData } from '../../Interfaces/vehicle'
import { IOfferData } from '../../Interfaces/offer'
interface OfferDataProps {
    data: IOfferData,
    show: Boolean,
    handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
interface EditOfferStateInterface {
    from: string,
    to: string,
    time: string,
    date: string,
    seats: number|string,
    viaPoints: string,
    price: number|string,
    vehicleID: string,
    vehicle: Array<IVehicleData>,
}
class EditOffer extends Component<OfferDataProps, EditOfferStateInterface> {
    constructor(props: OfferDataProps) {
        super(props)
        this.state = {
            from: '',
            to: '',
            time: '',
            date: '',
            seats: '',
            viaPoints: '',
            price: '',
            vehicleID: '',
            vehicle: []
        }

        this.UpdateRequest = this.UpdateRequest.bind(this);
    }
    componentDidMount() {
        var data = JSON.parse(localStorage.getItem('vehicle')!).vehicles;
        this.setState({ vehicle: data });
        this.setState({ from: this.props.data.StartingPoint });
        this.setState({ to: this.props.data.EndingPoint });
        this.setState({ time: this.props.data.Time });
        this.setState({ date: YearDateFormat(this.props.data.Date) });
        this.setState({ seats: this.props.data.SeatsAvailable });
        this.setState({ viaPoints: this.props.data.ViaPoints });
        this.setState({ price: this.props.data.OfferPrice });
        this.setState({ vehicleID: this.props.data.VehicleID });
    }
    async UpdateRequest(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const offerJson = JSON.stringify({
            "ID": this.props.data.ID,
            "UserID": JSON.parse(localStorage.getItem('user')!).userID,
            "VehicleID": this.state.vehicleID,
            "StartingPoint": (this.state.from).toUpperCase(),
            "EndingPoint": (this.state.to).toUpperCase(),
            "ViaPoints": (this.state.viaPoints).toUpperCase(),
            "SeatsAvailable": this.state.seats,
            "MoneyRecieved": 0,
            "IsClosed": false,
            "Date": this.state.date,
            "Time": this.state.time,
            "OfferPrice": this.state.price,
        }
        );
        const IsUpdated = await UpdateOffer(offerJson);
        if (IsUpdated) {
            const IsBookingDeleted = await DeleteOfferBooking(this.props.data.ID);
            if (IsBookingDeleted) {
                window.location.reload();
            }
            else {
                alert("server un reachable");
            }
        }
        else {
            alert('booking is not updated');
        }
    }
    handleUserInput(event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ ...this.state, ...{ [event.target.name]: event.target.value } });
    }
    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
                <form className="edit-offer" onSubmit={this.UpdateRequest}>
                    <label className="user-name">From:</label>
                    <input className="user-name-text" type="text" name='from' required defaultValue={this.state.from} onChange={(event) => this.handleUserInput(event)}></input>
                    <label className="user-name">To:</label>
                    <input type="text" className="user-name-text" name='to' required defaultValue={this.state.to} onChange={(event) => this.handleUserInput(event)}></input>
                    <br />
                    <label className="user-name">Seats:</label>
                    <input className="user-name-text" type="number" min="1" max="3" name="seats" defaultValue={this.state.seats} onChange={(event) => this.handleUserInput(event)}></input>
                    <label className="user-name">Points:</label>
                    <input type="text" className="user-name-text" name='viaPoints' required defaultValue={this.state.viaPoints} onChange={(event) => this.handleUserInput(event)}></input>
                    <br />
                    <label className="user-name">Price:</label>
                    <input type="number" step='0.01' min='0' className="user-name-text" name='price' required defaultValue={this.state.price} onChange={(event) => this.handleUserInput(event)}></input>
                    <label className="user-name">Date:</label>
                    <input type="date" className="user-name-text" name="date" defaultValue={this.state.date} onChange={(event) => this.handleUserInput(event)}></input><br />
                    <label className="user-name">Vehicle:</label>
                    <select name="vehicleID" onChange={(event) => this.handleUserInput(event)}>
                        <option value="none" selected disabled hidden>{this.state.vehicleID}</option>
                        {this.state.vehicle.map((vehicle) => (
                            <option value={vehicle.ID} >{vehicle.ID}</option>
                        ))}
                    </select>
                    <label className="user-name">Time:</label>
                    <select className="user-name-text" name="time" onChange={(event) => this.handleUserInput(event)}>
                        <option value="none" selected disabled hidden>{this.state.time}</option>
                        <option value='5am-9am' >5am-9am</option>
                        <option value='9am-12pm' >9am-12pm</option>
                        <option value='12pm-3pm' >12pm-3pm</option>
                        <option value='3pm-6pm' >3pm-6pm</option>
                        <option value='6pm-9pm' >6pm-9pm</option>
                    </select>
                    <br />
                    <button className="save-profile" type="submit">Save</button>
                    <button className="cancel-modal" onClick={this.props.handleClose}>Cancel</button>
                </form>
            </div>
        );
    }
}
export default EditOffer;