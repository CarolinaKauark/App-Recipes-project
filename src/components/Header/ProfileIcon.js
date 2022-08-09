import React from 'react';
import { Nav, Image } from 'react-bootstrap';

import profileIcon from '../../images/profileIcon.svg';

const ProfileIcon = () => (
  <Nav.Link href="/profile">
    <Image
      src={ profileIcon }
      alt="Profile"
      data-testid="profile-top-btn"
    />
  </Nav.Link>
);

export default ProfileIcon;
