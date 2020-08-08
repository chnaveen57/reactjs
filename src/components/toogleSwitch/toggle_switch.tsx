import './toggle_switch.scss'
import React from 'react';
interface ToogleSwitchCheckedInterface{
  IsChecked:any,
}
function ToggleSwitch(props:ToogleSwitchCheckedInterface) {
    return <div className="toggle-switch">
    <label className="switch">
      <input type="checkbox" checked={props.IsChecked}></input>
      <span className="slider round"></span>
    </label>
  </div>;
  }
export default ToggleSwitch;