/* eslint-disable react/prop-types */
import React from 'react';
import Lobby from './Lobby';
import Auth from './Auth';

function Home(props) {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = props;
  return isLoggedIn ? (
    <Lobby userName={user.userName} setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <Auth setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
  );
}

export default Home;
