import { Box, ListItemIcon } from '@mui/material';
import LogoContainer from '../../components/logoContainer';
import './index.scss';
import {
  MenuOutlined,
  Search,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import TaxiCard from '../../components/taxiCard';
import { VehicleType } from '../../const';
import GeocodingAutocomplete from '../../components/locationSearch';
import { useEffect, useState } from 'react';
import { TLocationData } from '../../types/geoLocation';


export default function Home() {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<TLocationData | undefined>(undefined)

  const onUserClick = ()=>{
    navigate('/user/dashboard');
  };

  const locationResults = (data : TLocationData)=>{
    data && setLocationData(data);
  }

  useEffect(() => {
    return () => {
        console.log('locatio', locationData)
    };
  }, [locationData])

  return (
    <div>
      <div className="home-nav">
        <div className="nav-inner">
          <LogoContainer width='100px' onClick={()=> onUserClick()}/>
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', fontSize: "1.7rem", cursor: 'pointer' }} className='user-home' onClick={onUserClick}>
            <MenuOutlined />
          </ListItemIcon>
        </div>
      </div>
      <Box className="home-body" sx={{marginTop: '80px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', position: 'absolute', width: '100%', alignItems: 'center'}} >
          <div className="search-container">
            <div className="text-container">
            </div>
            <div className="location">
              <GeocodingAutocomplete results={locationResults} initialLat={6.032894799999999} initialLng={80.2167912}/>
            </div>
          </div>
          <TaxiCard vehicleType={VehicleType.BIKE}/>
          <TaxiCard vehicleType={VehicleType.CAR}/>
          <TaxiCard vehicleType={VehicleType.BIKE}/>
      </Box>
    </div>
  );
}
