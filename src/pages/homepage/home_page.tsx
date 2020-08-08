import React, { Component, Fragment } from 'react';
import RideOption from '../../components/rideOptions/ride_options';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import UserNavBar from '../../components/navBar/user_nav_bar';
import BookRide from '../bookride/book_rides'
import OfferRide from '../offerride/offer_ride'
import Profile from '../profile/profile'
import MyRides from '../myRides/my_rides'
import AuthenticatedRoute from '../../routes/authenticated_route';
import OfferRoute from '../../routes/offer_route'
class HomeScreen extends Component {
    render() {
        return (
            <Router>
            <Fragment>
                <UserNavBar />
                <Switch>
                    <AuthenticatedRoute exact path='/home' component={RideOption}/>
                    <AuthenticatedRoute exact path='/home/bookride' component={BookRide} />
                    <OfferRoute exact path='/home/offerride' component={OfferRide} />
                    <AuthenticatedRoute exact path='/home/profile' component={Profile} />
                    <AuthenticatedRoute exact path='/home/myrides' component={MyRides} />
                </Switch>
            </Fragment>
            </Router>
        );
    }
}
export default HomeScreen;