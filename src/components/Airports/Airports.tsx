import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { useStyles } from 'utils';

interface Props {
  data?: any[];
}

const Airports: React.FC<Props> = ({ data }) => {
  const classes = useStyles();

  return (
    <>
      {data?.length
        ? data.map((e) => {
            const { icao24, callsign, firstSeen, lastSeen, estArrivalAirport, estDepartureAirport } = e;
            return (
              <Card key={icao24 + firstSeen} style={{ display: 'flex', padding: 10 }}>
                <Hidden xsDown>
                  <CardMedia style={{ width: '175px' }} image="/plane.jpg" title="Plane photo" />
                </Hidden>
                <CardContent>
                  <Typography className={classes.airport}>
                    <span className={classes.airportSpan}>Icao24:</span>
                    {icao24 ?? 'unavailable'}
                  </Typography>
                  <Typography className={classes.airport}>
                    <span className={classes.airportSpan}>Call Sign:</span>
                    {callsign ?? 'unavailable'}
                  </Typography>
                  <Typography className={classes.airport}>
                    <span className={classes.airportSpan}>Departed from:</span>
                    {estDepartureAirport ?? 'unavailable'}
                  </Typography>
                  <Typography className={classes.airport}>
                    <span className={classes.airportSpan}>Arrive at:</span>
                    {estArrivalAirport ?? 'unavailable'}
                  </Typography>
                  <Typography className={classes.airport}>
                    <span className={classes.airportSpan}>First seen:</span>
                    {new Date(lastSeen * 1000).toUTCString()}
                  </Typography>
                  <Typography className={classes.airport}>
                    <span className={classes.airportSpan}>Last seen:</span>
                    {new Date(firstSeen * 1000).toUTCString()}
                  </Typography>
                </CardContent>
              </Card>
            );
          })
        : null}
    </>
  );
};

export default Airports;
