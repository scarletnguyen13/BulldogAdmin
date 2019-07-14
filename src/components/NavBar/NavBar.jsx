import React, { Component, Fragment } from 'react';
import './NavBar.css'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return(
      <Fragment>
        <div className='navbar'>
          <img id='logo' src={require('../../assets/images/churchill.jpg')} alt='Churchill Logo' />
          <h2 id='logo-text'>Bulldog Admin</h2>

          <div className='right-container'>
            <img id='notification-icon' src={require('../../assets/images/notification_icon.png')} alt='Notification Icon' />
            <div id='avatar'>
              <h3 id='user-inits'>SN</h3>
            </div>
            <div className="arrow-down" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NavBar;