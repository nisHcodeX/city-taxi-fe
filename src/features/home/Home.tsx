import { Box, ListItemIcon } from '@mui/material';
import LogoContainer from '../../components/logoContainer';
import './index.scss';
import {
  MenuOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import TaxiCard from '../../components/taxiCard';
import { VehicleType } from '../../const';

export default function Home() {
  const navigate = useNavigate();

  const onUserClick = ()=>{
    navigate('/user/dashboard');
  };

  return (
    <div>
      <div className="home-nav">
        <div className="nav-inner">
          <LogoContainer width='100px' />
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', fontSize: "1.7rem", cursor: 'pointer' }} className='user-home' onClick={onUserClick}>
            <MenuOutlined />
          </ListItemIcon>
        </div>
      </div>
      <Box className="home-body" sx={{marginTop: '80px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', position: 'absolute', width: '100%', alignItems: 'center'}} >
          <TaxiCard vehicleType={VehicleType.BIKE}/>
          <TaxiCard vehicleType={VehicleType.CAR}/>
          <TaxiCard vehicleType={VehicleType.BIKE}/>
      </Box>
    </div>
  );
}
