import React from 'react';
import Loader from 'react-loader-spinner';

interface Props {}

const Spinner = (props: Props) => {
  return <Loader type="Plane" color="#00BFFF" height={100} width={100} />;
};

export default Spinner;
