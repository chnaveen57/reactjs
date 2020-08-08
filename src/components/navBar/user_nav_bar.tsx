import React, { Component } from 'react';
import Logo from '../logo/logo';
import Avatar from '../../assets/profilepic.jpg';
import MenuOptions from '../menu/menu_options'
import './navbar.scss'
interface ShowMenuInterface {
    showmenu:Boolean,
}
class UserNavBar extends Component<{},ShowMenuInterface> {
    constructor(props={}) {
        super(props);
        this.state = {
            showmenu: false
        };
        this.menuBox = this.menuBox.bind(this);
    }
    menuBox() {
        this.setState({ showmenu: !this.state.showmenu });
    }
    render() {
        return (
            <div className="nav-bar">
                <div className="logo-image">
                    <Logo />
                </div>
                <div className="user-profile">
                    <p> <span className="user-name">{JSON.parse(localStorage.getItem('user')!).FirstName} { JSON.parse(localStorage.getItem('user')!).LastName}</span>
                        <img  className="profile-pic" src={Avatar} alt="ProfilePic" onClick={this.menuBox}></img></p>
                </div>
                {
                    this.state.showmenu ?
                        <MenuOptions menuBox={this.menuBox}/> : null
                }
            </div>
        );
    }
}
export default UserNavBar;