import React, { Component, Fragment } from 'react';
import { OfferBookings, UpdateBooking } from '../../api/booking';
import { UpdateOffer } from '../../api/offer';
import { UpdateBalance } from '../../api/wallet';
import './offer_requests.scss'
import { IBookingData } from '../../Interfaces/booking'
import { IOfferData } from '../../Interfaces/offer'
interface OfferRequestInterface {
    bookings: Array<IBookingData>,
    request: Array<string>,
}
interface OfferRequestPropsInterface {
    data:IOfferData,
    show: Boolean,
    handleClose: (event: any) => void
}
class OfferRequests extends Component<OfferRequestPropsInterface,OfferRequestInterface> {
    constructor(props:OfferRequestPropsInterface) {
        super(props)
        this.state = {
            bookings: [],
            request: []
        }
    }
    async componentDidMount() {
        const data = await OfferBookings(this.props.data.ID);
        var i;
        for (i = 0; i < data.length; i++) {
            var value = '';
            if (data[i].IsAccepted) {
                value = "Accepted";
            }
            if (data[i].IsRejected) {
                value = "Rejected";
            }
            this.setState(prev => ({ request: [...prev.request, value] }))
        }
        this.setState({ bookings: data });
        console.log(this.state.request);
    }
    async AcceptRequest(index:number) {
        const data = this.state.bookings[index];
        data.IsAccepted = true;
        if (this.props.data.SeatsAvailable >= data.SeatsNeeded) {
            const IsUpdated = await UpdateBooking(data);
            if (IsUpdated) {
                let requests = [...this.state.request]
                requests[index] = 'Accepted'
                this.setState({ request: requests })
                const offerData = this.props.data;
                offerData.SeatsAvailable = this.props.data.SeatsAvailable - data.SeatsNeeded
                offerData.MoneyRecieved = data.Cost;
                await UpdateOffer(JSON.stringify(offerData));
            }
        }
        else {
            alert("no seats available");
        }

    }
    async RejectRequest(index:number) {
        const data = this.state.bookings[index];
        data.IsRejected = true;
        const IsUpdated = await UpdateBooking(data);
        if (IsUpdated) {
            let requests = [...this.state.request]
            requests[index] = 'Rejected';
            this.setState({ request: requests });
            await UpdateBalance(data.Cost, data.UserID);
            await UpdateBalance(-(this.props.data.OfferPrice), JSON.parse(localStorage.getItem('user')!).userID)
        }
    }
    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
                <div className="offer-request">
                    <h2 className='request-heading'>List of Requests</h2>
                    <p className='close-requests' onClick={this.props.handleClose}>X</p>
                    <table>
                        <tr>
                            <th>userId</th>
                            <th>from</th>
                            <th>to</th>
                            <th>Seats</th>
                            <th>Accept/Reject</th>
                        </tr>
                        {this.state.bookings.map((booking, index) => (
                            <tr>
                                <td>{booking.UserID}</td>
                                <td>{booking.StartingPoint}</td>
                                <td>{booking.EndingPoint}</td>
                                <td>{booking.SeatsNeeded}</td>
                                <td>{this.state.request[index] ? this.state.request[index] : <Fragment><p className="request-accept" onClick={() => this.AcceptRequest(index)}>Accept </p><span className="request-reject" onClick={() => this.RejectRequest(index)}>Reject</span></Fragment>}</td>
                            </tr>
                        ))}
                    </table>
                    {this.state.bookings.length ? null : <h2>NO Requests</h2>}
                </div>
            </div>
        );
    }
}
export default OfferRequests;