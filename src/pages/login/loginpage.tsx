import React, { Component, Fragment } from 'react';
import './loginpage.scss'
import SideContext from '../../components/formSideBar/form_side_bar'
import Login from '../../components/loginForm/login';
class LoginPage extends Component {
  render() {
   return (
     <Fragment>
       <div className="side-panel">
         <SideContext/>
       </div>
       <div className="loginform">
         <Login/>
       </div>
     </Fragment>
   );
 }
}
export default LoginPage;
