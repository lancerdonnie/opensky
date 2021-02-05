import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Airports from 'components/Airports';
import Nav from 'components/Nav';
import Spinner from 'components/Spinner';

import { cities } from 'consts';
import { useStyles } from 'utils';

const Dashboard = () => {
  const [icao, setIcao] = useState('');
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState<any>(24 * 60);
  const [departure, setDeparture] = useState<string>('arrival');

  const classes = useStyles();

  useEffect(() => {
    if (open && icao) {
      getArrivals();
    }
    // eslint-disable-next-line
  }, [open, icao, minutes, departure]);

  const epoch = useMemo(() => {
    //always use the current time to fetch data wihout causing loop
    return Math.round(Date.now() / 1000);
    // eslint-disable-next-line
  }, [icao, departure, minutes]);

  const calculateBegin = () => {
    //calculate minutes to subtract from select option
    return epoch - minutes * 60;
  };

  const { data, refetch: getArrivals, isFetching } = useQuery<any[]>(
    `https://opensky-network.org/api/flights/${departure}?airport=${icao}&begin=${calculateBegin()}&end=${epoch}`,
    {
      enabled: !!departure && !!icao,
    }
  );

  const handleClick = (e: string) => {
    setIcao(e);
    setOpen(true);
  };

  const handleClose = () => {
    setIcao('');
    setMinutes(24 * 60);
    setDeparture('arrival');
    setOpen(false);
  };

  const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMinutes(event.target.value);
  };

  const handleDeptChange = () => {
    setDeparture((dep) => (dep === 'arrival' ? 'departure' : 'arrival'));
  };

  return (
    <Container className="flex-col overflow-hidden h-full">
      <Nav />

      <Grid container spacing={3} justify="center" style={{ padding: 25, overflow: 'auto' }}>
        {cities.map((e) => {
          return (
            <Grid item key={e.city} className={classes.bullet}>
              <Paper
                onClick={() => handleClick(e.icao)}
                style={{ height: 200, width: 200, padding: 15, cursor: 'pointer', background: '#d9edff' }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  {e.city}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  {e.name}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disableElevation
            style={{ position: 'absolute', top: 5, right: 5 }}
            onClick={handleClose}
          >
            X
          </Button>

          <Grid container spacing={2} justify="flex-start" style={{ marginTop: 8 }}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="body1">Time: </Typography>
                </Grid>
                <Grid item>
                  <Select id="demo-simple-select" value={minutes} onChange={handleTimeChange} label="Time">
                    <MenuItem value={10}>10 Minutes</MenuItem>
                    <MenuItem value={30}>30 Minutes</MenuItem>
                    <MenuItem value={60}>60 Minutes</MenuItem>
                    <MenuItem value={6 * 60}>6 Hours</MenuItem>
                    <MenuItem value={12 * 60}>12 Hours</MenuItem>
                    <MenuItem value={24 * 60}>24 Hours</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle1">Type: </Typography>
                </Grid>
                <Grid item>
                  <Select id="demo-simple-select" value={departure} onChange={handleDeptChange}>
                    <MenuItem value={'departure'}>Departure</MenuItem>
                    <MenuItem value={'arrival'}>Arrival</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div className="overflow-hidden" style={{ flex: 1, marginTop: 15 }}>
            <Typography variant="h6">{departure === 'departure' ? 'Departures' : 'Arrivals'}</Typography>
            <Divider />

            {!isFetching ? (
              <div className="overflow-auto h-full">
                <Airports data={data} />
              </div>
            ) : (
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default Dashboard;
