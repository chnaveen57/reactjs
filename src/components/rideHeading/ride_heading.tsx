import React from 'react';
import './ride_heading.scss'
interface RideHeadingInterface{
  heading:string,
}
function RideHeading(props:RideHeadingInterface) {
    return <div className="book-ride-heading">
    <h2 className="title-text">{props.heading}</h2>
    <p className="match-text">we get you the matches asap !</p>
  </div>;
  }
export default RideHeading;