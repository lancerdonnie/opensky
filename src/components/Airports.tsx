import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';

import { useTheme } from '@material-ui/core/styles';

interface Props {
  data?: any[];
}

const Airports: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  console.log(matches);

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
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Icao24:</span>
                    {icao24 ?? 'unavailable'}
                  </Typography>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Call Sign:</span>
                    {callsign ?? 'unavailable'}
                  </Typography>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Departed from:</span>
                    {estDepartureAirport ?? 'unavailable'}
                  </Typography>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Arrive at:</span>
                    {estArrivalAirport ?? 'unavailable'}
                  </Typography>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>First seen:</span>
                    {new Date(lastSeen * 1000).toUTCString()}
                  </Typography>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Last seen:</span>
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
