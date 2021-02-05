import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
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
});
