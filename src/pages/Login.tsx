import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
    margin: 'auto',
  },
});

const Login = ({ history }: any) => {
  const [state, setState] = useState({ username: '', password: '' });
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useLayoutEffect(() => {
    if (localStorage.auth === 'true') history.push('/');
  }, []);

  const handleChange = (e: React.ChangeEvent<{ value: any; name: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (state.username === 'demo' && state.password === 'demo') {
      localStorage.setItem('auth', 'true');
      history.push('/');
    } else {
      setOpen(true);
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Log in
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.root}>
          {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
          <FormControlLabel
            label="Username"
            name="username"
            control={<TextField variant="filled" color="primary" name="username" onChange={handleChange} />}
          />
          <FormControlLabel
            label="Password"
            name="password"
            control={<TextField variant="filled" color="primary" name="password" onChange={handleChange} />}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={false}
            size="medium"
            // startIcon={}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </FormControl>
      </form>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} message="Username or Password incorrect!" />
    </Container>
  );
};

export default Login;
