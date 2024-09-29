import React from 'react';
import {TaxiLogo} from '../../assets/img';

interface logoProps {
  width?: string;
  onClick?: () => void;
}
const LogoContainer = ({width}: logoProps) => {
  return <img src={TaxiLogo} width={width ? width : '150px'} />;
};

export default LogoContainer;
