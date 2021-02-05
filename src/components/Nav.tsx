import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Nav = ({ history }: any) => {
  useEffect(() => {
    if (localStorage.auth !== 'true') history.push('/login');
  }, []);

  const handleLogout = () => {
    localStorage.auth = 'false';
    history.push('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Dashboard</Typography>
        <Button onClick={handleLogout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
