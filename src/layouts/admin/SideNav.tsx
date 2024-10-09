import {
  CalculateOutlined,
  ChecklistRtlOutlined,
  ChevronLeft,
  ChevronRight,
  ErrorOutline,
  ExitToApp,
  AccountCircle,
  Home,
  SupportAgent,
  LocalTaxi,
  AccessTime
} from '@mui/icons-material';
import {
  ButtonBase,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  useTheme,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer/Drawer';
import LogoContainer from './../../components/logoContainer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 64,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'contain',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const SideNav = ({ open, onDrawerOpen, onDrawerClose }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleDrawerOpen = () => {
    onDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    onDrawerClose(false);
  };
  const adminLogut = () => {
    localStorage.removeItem('account');
    navigate('/adminLogin');
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <ImageButton
          onClick={() => {
            navigate(`/`);
          }}
        >
          <LogoContainer width="100px" />
        </ImageButton>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ListItem key={'Dashboard'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/admin/dashboard`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary={t('dashboard')} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Operators'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/admin/operator`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              < SupportAgent />
            </ListItemIcon>
            <ListItemText primary={t('Operators')} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Drivers'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/admin/driver`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <CalculateOutlined />
            </ListItemIcon>
            <ListItemText primary={t('Drivers')} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Customers'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/admin/customer`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={t('Customers')} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Booking'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/admin/rides`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary={t('Bookings')} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        {/* <ListItem key={'Profile'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/admin/profile`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <ChecklistRtlOutlined />
            </ListItemIcon>
            <ListItemText primary={t('profile')} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem> */}
        <ListItem key={'Logout'} disablePadding sx={{ display: 'block', marginTop: 'auto' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              adminLogut();
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              < ExitToApp />
            </ListItemIcon>
            <ListItemText primary={t('Logout')} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;
