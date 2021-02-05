import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Flight from '@material-ui/icons/Flight';

const Nav = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.auth !== 'true') history.push('/login');
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.auth = 'false';
    history.push('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="flex items-center">
          <IconButton edge="start" color="inherit">
            <Flight />
          </IconButton>
          <Typography variant="h5">{location.pathname === '/' ? 'Dashboard' : 'Login'}</Typography>
        </div>
        {location.pathname === '/' && (
          <div>
            <Button color="inherit">About</Button>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
