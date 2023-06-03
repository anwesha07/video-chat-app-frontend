import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Toolbar, AppBar, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import lobbyStyles from './styles/lobbyStyles';

function NavBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { userName, logoutUser } = props;

  const handleLogoutButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleCloseMenu();
    logoutUser();
  };

  return (
    <AppBar position="static" sx={lobbyStyles.navBar}>
      <Toolbar>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleLogoutButtonClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={handleLogout}>{`Logout ${userName}`}</MenuItem>
        </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {`Hello, ${userName}!`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  userName: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default NavBar;
