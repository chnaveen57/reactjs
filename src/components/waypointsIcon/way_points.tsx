import './waypoints.scss'
import React from 'react';
interface DisplayInterface {
  display:string,
}
function WayPoints(props:DisplayInterface) {
  const PointsStyle = {
    display:props.display
};
    return <div>
    <span style={PointsStyle} className="blue-dot"></span>
    <span style={PointsStyle} className="dot"></span>
    <span style={PointsStyle} className="dot"></span>
    <span style={PointsStyle} className="dot"></span>
    <span style={PointsStyle} className="dot"></span>
    <i style={PointsStyle}  className="fa location-icon">&#xf041;</i>
  </div>
  }
export default WayPoints;