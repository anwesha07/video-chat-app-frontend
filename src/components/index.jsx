/* eslint-disable react/prop-types */
import React from 'react';
import Lobby from './Lobby';
import Auth from './Auth';

function Home(props) {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = props;
  // console.log(user);
  return isLoggedIn ? (
    <Lobby userName={user.userName} setIsLoggedIn={(status) => setIsLoggedIn(status)} />
  ) : (
    <Auth setIsLoggedIn={(status) => setIsLoggedIn(status)} setUser={setUser} />
  );
}

export default Home;
