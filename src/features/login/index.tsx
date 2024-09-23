import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, CardContent } from '@mui/material';
import './index.scss';
import { Roles } from '../../const';
import SignIn from './login';

export default function LoginPage() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', }} className="login-wrapper">
      <CardContent sx={{width: '500px'}}>
        <Card variant='outlined' className='login-card'>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="User" value="1" className='tab-item'/>
                <Tab label="Driver" value="2" className='tab-item'/>
              </TabList>
            </Box>
            <TabPanel value="1">
              <SignIn loginType={Roles.USER}/>
            </TabPanel>
            <TabPanel value="2">
              <SignIn loginType={Roles.DRIVER}/>
            </TabPanel>
          </TabContext>
        </Card>
      </CardContent>
    </Box>
  );
}