import { ListItemIcon } from '@mui/material';
import LogoContainer from '../../components/logoContainer';
import './index.scss';
import {
  MenuOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';

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
      <div className="home-body">
          
      </div>
    </div>
  );
}
