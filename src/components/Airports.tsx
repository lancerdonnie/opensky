import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

interface Props {
  data?: any[];
}

const Airports: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data?.length
        ? data.map((e) => {
            const { icao24, callsign, firstSeen, lastSeen, estArrivalAirport, estDepartureAirport } = e;
            return (
              <Card key={icao24 + firstSeen} style={{ display: 'flex', padding: 10 }}>
                <CardMedia style={{ width: '150px' }} image="/plane.jpg" title="Plane photo" />
                <CardContent>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Icao24:</span>
                    {icao24}
                  </Typography>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Call Sign:</span>
                    {callsign}
                  </Typography>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Departed from:</span>
                    {estDepartureAirport}
                  </Typography>
                  <Typography>
                    <span style={{ minWidth: 130, display: 'inline-block', fontWeight: 'bold' }}>Arrive at:</span>
                    {estArrivalAirport}
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
