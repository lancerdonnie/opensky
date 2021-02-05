import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import Modal from '@material-ui/core/Modal';
import { queryClient } from 'App';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Spinner from 'components/Spinner';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const epoch = () => Math.round(Date.now() / 1000);

const cities = [
  { name: 'Chicago O’Hare International Airport', city: 'Chicago', icao: 'KORD' },
  { name: 'Hartsfield–Jackson Atlanta International Airport', city: 'Atlanta', icao: 'KATL' },
  { name: 'Dallas/Fort Worth International Airport', city: 'Dallas', icao: 'KORD' },
  { name: 'Los Angeles International Airport ', city: 'Los Angeles', icao: 'KORD' },
  { name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', icao: 'EHAM' },
  { name: 'Frankfurt Airport', city: 'Frankfurt', icao: 'EDDF' },
  { name: 'Shanghai Pudong International Airport', city: 'Shanghai', icao: 'ZSPD' },
  { name: 'Paris Charles de Gaulle Airport', city: 'Paris', icao: 'LFPG' },
  { name: 'London Heathrow Airport', city: 'London', icao: 'EGLL' },
  { name: 'Mexico City International Airport', city: 'Mexico', icao: 'MMMX' },
];

const Dashboard = ({ history }: any) => {
  const [icao, setIcao] = useState('');
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState<any>(24 * 60);
  const [departure, setDeparture] = useState<string>('arrival');
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    if (localStorage.auth !== 'true') history.push('/login');
  }, []);

  useEffect(() => {
    if (open && icao) {
      getArrivals();
    }
  }, [open, icao, minutes, departure]);

  const calculateBegin = () => {
    return epoch() - minutes * 60;
  };

  const { refetch: getArrivals, isFetching } = useQuery<any[]>(
    `https://opensky-network.org/api/flights/${departure}?airport=${icao}&begin=${calculateBegin()}&end=${epoch()}`,
    {
      enabled: false,
      onSuccess(e: any) {
        setData(e);
      },
      onError(e: any) {
        if (e.response.status === 404) setData([]);
      },
    }
  );

  const handleClick = (e: string) => {
    setIcao(e);
    setOpen(true);
    // queryClient.invalidateQueries('todos')
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMinutes(event.target.value);
  };
  const handleDeptChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDeparture((dep) => (dep === 'arrival' ? 'departure' : 'arrival'));
  };
  const handleLogout = () => {
    localStorage.auth = 'false';
    history.push('/login');
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">Dashboard</Typography>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} justify="center" style={{ padding: 20 }}>
        {cities.map((e) => {
          return (
            <Grid item key={e.city}>
              <Paper
                onClick={() => handleClick(e.icao)}
                style={{ height: 200, width: 200, padding: 15, cursor: 'pointer' }}
              >
                <div>{e.city}</div>
                <div>{e.name}</div>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            height: 'calc(100% - 20px)',
            backgroundColor: 'white',
            // border: '2px solid #000',
            margin: '10px',
            overflow: 'hidden',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex' }}>
            <Select id="demo-simple-select" value={minutes} onChange={handleTimeChange}>
              <MenuItem value={10}>Ten Minutes</MenuItem>
              <MenuItem value={30}>Thirty Minutes</MenuItem>
              <MenuItem value={60}>Sixty Minutes</MenuItem>
              <MenuItem value={6 * 60}>Six Hours</MenuItem>
              <MenuItem value={12 * 60}>Twelve Hours</MenuItem>
              <MenuItem value={24 * 60}>Twenty Four Hours</MenuItem>
            </Select>
            <Select id="demo-simple-select" value={departure} onChange={handleDeptChange}>
              <MenuItem value={'departure'}>Departure</MenuItem>
              <MenuItem value={'arrival'}>Arrival</MenuItem>
            </Select>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <span>{departure === 'departure' ? 'Departures' : 'Arrivals'}</span>
            {!isFetching ? (
              <div style={{ height: '100%', overflow: 'auto' }}>
                {data?.length &&
                  data.map((e) => {
                    const { icao24, callsign, firstSeen, lastSeen, estArrivalAirport, estDepartureAirport } = e;
                    return (
                      <Card key={icao24 + callsign} style={{ display: 'flex' }}>
                        <CardMedia style={{ width: '150px' }} image="/plane.jpg" title="Plane photo" />
                        <CardContent>
                          <Typography>Icao24: {icao24}</Typography>
                          <Typography>Departed from: {estDepartureAirport}</Typography>
                          <Typography>Arrive at: {estArrivalAirport}</Typography>
                          <Typography>First seen: {new Date(lastSeen * 1000).toUTCString()}</Typography>
                          <Typography>Last seen: {new Date(firstSeen * 1000).toUTCString()}</Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            ) : (
              <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
