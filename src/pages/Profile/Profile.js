import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import PropTypes from 'prop-types';

import useLocalStorage from '../../hooks/useLocalStorage';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ButtonDoneRecipes from '../../components/Profile/ButtonDoneRecipes';
import ButtonFavoriteRecipes from '../../components/Profile/ButtonFavoriteRecipes';
import ButtonLogout from '../../components/Profile/ButtonLogout';

function Profile({ history }) {
  // Título apenas para teste
  const headerTitle = 'Profile';
  const [user] = useLocalStorage('user', {});

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title={ headerTitle } />
      <main id="profile-page">
        <Container className="mt-3 mb-3">
          <h2
            className="text-center text-secondary"
            data-testid="profile-email"
          >
            { user.email }
          </h2>
        </Container>
        <Stack gap={ 3 } id="profile-buttons" className="col-md-5 mx-auto">
          <ButtonDoneRecipes />
          <ButtonFavoriteRecipes />
          <ButtonLogout handleLogout={ logout } />
        </Stack>
      </main>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
