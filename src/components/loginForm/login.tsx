import React, { Component } from 'react';
import './login.scss'
import { IsUserExists } from '../../api/user';
import { ICredentials } from '../../Interfaces/user'
import { Link } from 'react-router-dom';
class Login extends Component<{}, ICredentials> {
  constructor(props={}) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hidden: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }
  handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, ...{ [event.target.name]: event.target.value } });
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  handleSubmit(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    IsUserExists(this.state.email, this.state.password);
  }
  render() {
    return (
      <div className="login-form">
        <p className="login">Log in</p>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter your Email"
            type="email"
            name="email"
            required
            onChange={(event) => this.handleUserInput(event)}
          />
          <br />

          <i className="fa fa-eye icon" onClick={this.toggleShow}></i>
          <input
            className='password'
            type={this.state.hidden ? "password" : "text"}
            name="password"
            placeholder="Enter your Password"
            required
            onChange={(event) => this.handleUserInput(event)}
          />
          <br />
          <input className="yellow-button" type="submit"></input>
        </form>
        <Link className="register-url" to='/register'><p className="sign-up-link">Not a member yet? <span className="sign-up-button" >SIGN UP</span></p></Link>
        <hr className="sign-up-button-line" />
      </div>
    );
  }
}
export default Login;