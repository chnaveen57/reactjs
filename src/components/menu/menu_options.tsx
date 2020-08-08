import React from 'react';
import {Link} from 'react-router-dom';
import './menu.scss';
import { useHistory } from "react-router-dom";
interface HideMenu {
  menuBox: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}
function MenuOptions(props:HideMenu) {
  let history = useHistory();
  function handleClick() {
    localStorage.removeItem('user');
    localStorage.removeItem('vehicle');
    history.push("/");
    window.location.reload();
  }
   return (
<div className="vertical-menu">
        <Link className="link" to="/home" onClick={props.menuBox}>Home</Link>
        <Link className="link" to="/home/profile" onClick={props.menuBox}>Profile</Link>
        <Link className="link" to="/home/myrides" onClick={props.menuBox}>MyRides</Link>
        <p onClick={handleClick} className="link">Logout</p>
        </div>
   );
 }
export default MenuOptions;