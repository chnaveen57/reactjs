import React, { Component, Fragment } from 'react';
import Avatar from '../../assets/profilepic.jpg';
import { GetVehicles, RegisterVehicle } from '../../api/vehicle';
import { UserWallet, UpdateBalance } from '../../api/wallet';
import { UpdateUser } from '../../api/user';
import LoadingSpinner from '../loading/loading';
import { IVehicleData } from '../../Interfaces/vehicle'
interface ProfieInterface {
    firstNameDisable: any,
    lastNameDisable: any,
    showVehicleForm: Boolean,
    showBalanceForm: Boolean,
    firstName: string,
    lastName: string,
    vehicles: Array<IVehicleData>,
    money: number,
    price: number,
    model: string,
    number: string,
    capacity: string,
    isLoading: Boolean
}
class EditProfile extends Component<{}, ProfieInterface> {
    constructor(props = {}) {
        super(props)
        this.state = {
            firstNameDisable: true,
            lastNameDisable: true,
            showVehicleForm: false,
            showBalanceForm: false,
            firstName: JSON.parse(localStorage.getItem('user')!).FirstName,
            lastName: JSON.parse(localStorage.getItem('user')!).LastName,
            vehicles: [],
            money: 0,
            price: 0,
            model: '',
            number: '',
            capacity: '',
            isLoading: true
        }
        this.AddVehicle = this.AddVehicle.bind(this);
        this.UpdateBalance = this.UpdateBalance.bind(this);
        this.UpdateProfile = this.UpdateProfile.bind(this);
        this.EditFirstName = this.EditFirstName.bind(this);
        this.EditLastName = this.EditLastName.bind(this);
    }
    async componentDidMount() {
        const data = await GetVehicles();
        const balance = await UserWallet();
        this.setState({ price: balance });
        this.setState({ vehicles: data });
        this.setState({ isLoading: false });
    }
    AddVehicle(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const Model = this.state.model;
        const Number = this.state.number;
        const Capacity = this.state.capacity;
        RegisterVehicle(Model, Number, Capacity);
    }
    async UpdateBalance(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const balance = this.state.money;
        const IsUpdated = await UpdateBalance(balance, JSON.parse(localStorage.getItem('user')!).userID);
        if (IsUpdated) {
            window.location.reload();
        }
        else {
            alert("Server unreachable")
        }
    }
    UpdateProfile(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        UpdateUser(this.state.firstName, this.state.lastName);
    }
    handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ ...this.state, ...{ [event.target.name]: event.target.value } });
    }
    showVehicle = () => {
        this.setState({ showVehicleForm: !this.state.showVehicleForm });
    };
    showBalance = () => {
        this.setState({ showBalanceForm: !this.state.showBalanceForm });
    };
    EditFirstName() {
        this.setState({ firstNameDisable: !this.state.firstNameDisable })
    }
    EditLastName() {
        this.setState({ lastNameDisable: !this.state.lastNameDisable })
    }
    render() {
        return (
            <Fragment>
                {this.state.isLoading ? <LoadingSpinner /> : null}
                <div className='profile-photo'>
                    <figure>
                        <img src={Avatar} alt="Trulli"></img>
                        <figcaption>ProfilePic</figcaption>
                    </figure>
                </div>
                <div className='profile-form'>
                    <form onSubmit={this.UpdateProfile}>
                        <label className="user-name">FirstName:</label>
                        <input className="user-name-text" type="text" name='firstName' required disabled={this.state.firstNameDisable} defaultValue={this.state.firstName} onChange={(event) => this.handleUserInput(event)}></input>
                        <i className="fa edit-button" onClick={this.EditFirstName}>&#xf044;</i>
                        <label className="user-name">LastName:</label>
                        <input type="text" className="user-name-text" name='lastName' required disabled={this.state.lastNameDisable} defaultValue={this.state.lastName} onChange={(event) => this.handleUserInput(event)}></input>
                        <i className="fa edit-button" onClick={this.EditLastName}>&#xf044;</i>
                        <button className="save-profile">Save</button>
                    </form>
                </div>

                <div className="vehicles">
                    <h2>List of vehicles</h2>
                    <table>
                        <tr>
                            <th>VehicleId</th>
                            <th>Model</th>
                            <th>Number</th>
                            <th>Capacity</th>
                        </tr>
                        {this.state.vehicles.map((vehicle) => (
                            <tr>
                                <td>{vehicle.ID}</td>
                                <td>{vehicle.Model}</td>
                                <td>{vehicle.Number}</td>
                                <td>{vehicle.Capacity}</td>
                            </tr>
                        ))}
                        {this.state.vehicles.length ? null : <h2 className='no-vehicle'>No Vehicles</h2>}
                    </table>
                    <button className='add-vehicle' onClick={this.showVehicle}>AddVehicle</button>
                    {this.state.showVehicleForm ? <form className="vehicle-form" onSubmit={this.AddVehicle}>
                        <label>Model</label><br />
                        <input type='text' name='model' required onChange={(event) => this.handleUserInput(event)}></input><br />
                        <label>Number</label><br />
                        <input type='text' name='number' required onChange={(event) => this.handleUserInput(event)}></input><br />
                        <label>Capacity</label><br />
                        <input type="number" name='capacity' required onChange={(event) => this.handleUserInput(event)}></input><br />
                        <input type='submit' className='vehicle-submit-button'></input>
                    </form> : null}
                </div>
                <div className="wallet">
                    <h2>User Wallet</h2>
                    <br />
                    <p className='show-balance'>Your account balance is ₹{this.state.price}</p>
                    <button className="add-balance-button" onClick={this.showBalance}>AddBalance</button>
                    {this.state.showBalanceForm ? <form className="balance-form" onSubmit={this.UpdateBalance}>
                        <label>Enter Money</label><br />
                        <input type="number" step='0.01' name='money' required onChange={(event) => this.handleUserInput(event)}></input><br />
                        <input className='update-balance' type="submit"></input>
                    </form> : null}
                </div>
            </Fragment>
        );
    }
}
export default EditProfile;