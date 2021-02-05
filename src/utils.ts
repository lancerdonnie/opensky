import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  bullet: {
    '&:hover': {
      transform: 'scale(0.9)',
      transition: 'transform ease-in-out 300ms',
    },
  },
  modal: {
    height: 'calc(100% - 20px)',
    backgroundColor: 'white',
    margin: '10px',
    overflow: 'hidden',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: 5,
  },
  airport: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
  airportSpan: {
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    minWidth: 130,
    fontWeight: 'bold',
  },
}));
