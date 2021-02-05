import { render, screen } from '@testing-library/react';
import Airports from './Airports';

const fixture1 = [
  {
    icao24: 'icao24',
    callsign: 'callsign',
    firstSeen: 11111,
    lastSeen: 22222,
    estArrivalAirport: 'DERW',
    estDepartureAirport: null,
  },
];
const fixture2 = [
  {
    icao24: 'icao24',
    callsign: 'callsign',
    firstSeen: 1612474854,
    lastSeen: 22222,
    estArrivalAirport: 'ECFF',
    estDepartureAirport: null,
  },
];

test('Airport Modal shows list', () => {
  const { rerender } = render(<Airports data={fixture1} />);

  const text = screen.getByText(/DERW/i);
  expect(text).toBeInTheDocument();

  rerender(<Airports data={fixture2} />);

  const text2 = screen.getByText(/Thu, 01 Jan 1970 06:10:22 GMT/i);
  expect(text2).toBeInTheDocument();
});
