import React, { Component } from 'react';
import './ride_card.scss'
import Avatar from '../../assets/profilepic.jpg';
import WayPoints from '../waypointsIcon/way_points';
import { DateFormat } from '../../api/get_date'
import EditOffer from '../editOffer/edit_offer';
import { DeleteOffer } from '../../api/offer';
import { DeleteBooking } from '../../api/booking';
import { UpdateBalance } from '../../api/wallet';
import { GetBookingRating, PostRating } from '../../api/rating'
import OfferRequests from '../offerRequests/offer_requests';
import StarRatingComponent from 'react-star-rating-component';
interface RideCardStateInterface {
    seats: number,
    price: number,
    showOffer: Boolean,
    showBooking: Boolean,
    buttonName: string,
    rating: number,
    show: Boolean,
    date: string,
    bookingRating: number,
}
interface RideCardPropsInterface {
    data: any,
    type: string,
}
class RideCard extends Component<RideCardPropsInterface, RideCardStateInterface> {
    constructor(props: RideCardPropsInterface) {
        super(props)
        this.state = {
            seats: 0,
            price: 0,
            showOffer: false,
            showBooking: false,
            buttonName: 'Pending',
            rating: 1,
            show: false,
            date: '',
            bookingRating: 0,

        }
    }
    async componentDidMount() {
        if (this.props.type === 'offer') {
            this.setState({ price: this.props.data.OfferPrice })
            this.setState({ seats: this.props.data.SeatsAvailable })
            this.setState({ buttonName: 'Update' });
        }
        else {
            this.setState({ price: this.props.data.Cost })
            this.setState({ seats: this.props.data.SeatsNeeded })
            if (this.props.data.IsAccepted) {
                this.setState({ buttonName: 'Accepted' });
            }
            if (this.props.data.IsRejected) {
                this.setState({ buttonName: "Rejected" });
            }
        }
        const rating = await GetBookingRating(this.props.data.ID);
        if (rating === 0) {
            this.setState({ show: true });
        }
        else {
            this.setState({ show: false })
            this.setState({ bookingRating: rating });
        }
        this.setState({ date: DateFormat(this.props.data.Date) })
    }
    handleUserInput(event: any) {
        this.setState({ ...this.state, ...{ [event.target.name]: event.target.value } });
    }
    showOfferModal = () => {
        this.setState({ showOffer: true });
    };

    hideOfferModal = () => {
        this.setState({ showOffer: false });
    };

    showBookingModal = () => {
        this.setState({ showBooking: true });
    };
    hideBookingModal = () => {
        this.setState({ showBooking: false });
    };
    DeleteRequest() {
        if (this.props.type === 'offer') {
            DeleteOffer(this.props.data.ID);
        }
        else {
            UpdateBalance(this.props.data.Cost, JSON.parse(localStorage.getItem('user')!).userID)
            DeleteBooking(this.props.data.ID);
        }
    }
    async AddRating() {
        const jsonData = JSON.stringify({
            "RideRating": this.state.rating,
            "BookingID": this.props.data.ID,
        })
        const IsRated = await PostRating(jsonData);
        if (IsRated) {
            this.setState({ bookingRating: this.state.rating });
            this.setState({ show: false });
        }
        else {
            alert('rating is not added');
        }
    }
    onStarClick(nextValue: number, prevValue: number, name: string) {
        this.setState({ rating: nextValue });
    }
    UpdateRequest() {
        if (this.props.type === 'offer') {
            this.showOfferModal();
        }
        else {
            this.showBookingModal();
        }
    }
    render() {
        return <div className="ride-card">
            <div className="rider-name"><h2>{JSON.parse(localStorage.getItem('user')!).FirstName} {JSON.parse(localStorage.getItem('user')!).LastName}</h2></div>
            <div className="rider-image"><img className="profile-pic" src={Avatar} alt="ProfilePic"></img></div>
            <div className="left-side">
                <label>From</label>
                <p className="ride-details">{this.props.data.StartingPoint}</p>
                <label>Date</label>
                <p className="ride-details">{this.state.date}</p>
                <label>Price</label>
                <p className="ride-details">₹{this.state.price}</p>
                {this.props.data.IsAccepted ? null : <button className="cancel-request" onClick={() => this.DeleteRequest()}>Delete</button>}
            </div>
            <div className="way-points">
                <WayPoints display="inline-block" />
            </div>
            <div className="right-side">
                <label>To</label>
                <p className="ride-details">{this.props.data.EndingPoint}</p>
                <label>Time</label>
                <p className="ride-details">{this.props.data.Time}</p>
                <label>Seats</label>
                <p className="ride-details">{this.state.seats}</p>
                <button className='update-request' onClick={() => this.UpdateRequest()}>{this.state.buttonName}</button>
            </div>
            {this.props.type === 'offer' ? <p className="ride-requests" onClick={() => this.showBookingModal()}>Requests</p> : null}
            {this.props.data.IsAccepted ? this.state.show ?
                <div className='rating'>
                    <StarRatingComponent
                        name="rate1"
                        renderStarIcon={() => <span><i  className="fa fa-star star-rating"></i></span>}
                        value={this.state.rating}
                        onStarClick={this.onStarClick.bind(this)}
                    />
                    <p className="ride-rate" onClick={() => this.AddRating()}>RateRide</p>
                </div> : <div className='rating'> &nbsp;&nbsp;{this.state.bookingRating} star rating</div> : null}
            {this.state.showOffer ? <EditOffer show={this.state.showOffer} handleClose={this.hideOfferModal} data={this.props.data} /> : null}
            {this.state.showBooking ? <OfferRequests show={this.state.showBooking} handleClose={this.hideBookingModal} data={this.props.data} /> : null}
        </div>
    }
}
export default RideCard;