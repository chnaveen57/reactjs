import React, { Component } from 'react';
import EditProfile from '../../components/editProfile/edit_profile';
import './profile.scss';
import bgImage from '../../assets/img4.png'
class Profile extends Component {
  componentDidMount()
  {
    document.body.style.backgroundImage = `url(${bgImage})`;
  }
  render() {
    return (
      <div className="profile">
        <EditProfile/>
      </div>
    );
  }
}
export default Profile;