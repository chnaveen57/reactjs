import React, { Component } from 'react';
import './form_side_bar.scss'
import Logo from '../logo/logo'
class SideContext extends Component {
  render() {
   return (
     <div className="left-panel">
       <Logo/>
       <Text/>
     </div>
   );
 }
}
function Text() {
  return (
      <div className="text-block">
          <p className="text">TURN <span style={{color:'#FFAC19'}}>MILES</span></p>
          <p className="text">INTO <span style={{color:'#9319FF'}}>MONEY</span></p>
          <h3>RIDES ON TAP</h3>
      </div>
  );
}
export default SideContext;
