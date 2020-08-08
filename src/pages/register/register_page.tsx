import React, { Component } from 'react';
import './register.scss'
import SideContext from '../../components/formSideBar/form_side_bar';
import Register from '../../components/singUpForm/signInForm'
class LoginPage extends Component {
  render() {
   return (
     <div>
       <div className="side-panel">
         <SideContext/>
       </div>
       <div className="signupform">
         <Register/>
       </div>
     </div>
   );
 }
}
export default LoginPage;