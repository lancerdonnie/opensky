import Button from '@material-ui/core/Button';
import React, { useLayoutEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
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
      <Typography variant="h5" gutterBottom style={{ color: '#849CB3' }}>
        Log in
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 250 }}>
        <TextField name="username" label="Username" value={state.username} onChange={handleChange} margin="normal" />
        <TextField
          name="password"
          label="Password"
          value={state.password}
          onChange={handleChange}
          margin="normal"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={false}
          size="medium"
          onClick={handleSubmit}
          style={{ marginTop: 40 }}
        >
          Login
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} message="Username or Password incorrect!" />
    </Container>
  );
};

export default Login;
