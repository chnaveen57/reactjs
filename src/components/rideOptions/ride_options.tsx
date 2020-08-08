import React from 'react';
import './ride_options.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import bgImage from '../../assets/img3.png'
function RideOptions() {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${bgImage})`;
      });
    return (
    <div className="ride-options">
        <h1>
            Hey Naveen!
            </h1>

        <Link to="/home/bookride"><div className="book-ride">
            Book a ride
            </div></Link>
        <Link to="/home/offerride">
            <div className='request-ride'>
                Offer a ride
            </div>
        </Link>
    </div>
    );
}

export default RideOptions;