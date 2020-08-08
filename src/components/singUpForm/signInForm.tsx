import React, { Component } from 'react';
import './signUp.scss'
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../api/user'
import { IRegister } from '../../Interfaces/user'
class Register extends Component<{}, IRegister> {
  constructor(props = {}) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
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
    const id = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if (password === confirmPassword) {
      RegisterUser(id, password);
    }
    else {
      alert("Passwords didn't match");
    }
  }
  render() {
    return (
      <div className="signup">
        <p className="sign-up">Sign up</p>
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
            placeholder="Enter your Password"
            name="password"
            onChange={(event) => this.handleUserInput(event)}
          />
          <br />
          <i className="fa fa-eye icon" onClick={this.toggleShow}></i>
          <input
            className='password'
            type={this.state.hidden ? "password" : "text"}
            placeholder="confirm password"
            name="confirmPassword"
            onChange={(event) => this.handleUserInput(event)}
          />
          <br />
          <input className="blue-button" type="submit"></input>
        </form>
        <Link className="login-url" to="/"><p className="login-link">Already a member? <span className="login-button">LOG IN</span></p></Link>
        <hr className="login-button-line" />
      </div>
    );
  }
}
export default Register;