import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseconfig';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: '100%',
        // padding: theme.spacing(3) 0 0 theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        boxShadow: 'none',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',

}));

export default function DrawerComp(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    let navigate = useNavigate();
    const { pathname } = useLocation();
    console.log(pathname.split('/')[1])
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleLogout() {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }


    let nav = [{
        label: 'Lojas',
        path: '/',
        icon: <StoreOutlinedIcon />
    }, {
        label: 'Items',
        path: 'items',
        icon: <ChairOutlinedIcon />

    },
    {
        label: 'Vendas',
        path: 'vendas',
        icon: <AttachMoneyIcon />
    },
    {
        label: 'Compras',
        path: 'compras',
        icon: <ShoppingCartOutlinedIcon />
    },
    {
        label: 'Resumo',
        path: 'fatura',
        icon: <ReceiptOutlinedIcon />
    }
    ]

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#F4F5FA', }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ backgroundColor: '#F4F5FA', boxShadow: 'none', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon style={{ color: "black" }} />
                    </IconButton>

                    <AccountCircleIcon style={{ color: "black" }} />
                    <Typography variant="h6" noWrap component="div" >
                        {/* Mezcla */}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ backgroundColor: '#F4F5FA', }}>
                    <image src='Header.png' style={{ height: '100%', width: '100%' }} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                {/* <Divider /> */}
                <List sx={{ backgroundColor: '#F4F5FA', height: '100%' }}>
                    {nav.map((e, index) => (
                        <ListItem key={e.label} disablePadding >
                            <ListItemButton onClick={() => { navigate(e.path) }} sx={{ backgroundColor: pathname.split('/')[1] == e.path ? 'rgba(25, 118, 210, 0.08)' : 'transparent' }}>
                                <ListItemIcon>
                                    {e.icon}
                                </ListItemIcon>
                                <ListItemText primary={e.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding sx={{ float: 'right' }}>
                        <ListItemButton onClick={handleLogout} >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={'log out'} />
                        </ListItemButton>
                    </ListItem>
                </List>

            </Drawer>
            <Main open={open} sx={{ minHeight: '100vh', justifyContent: 'center', }}  >
                <Box m={{ xs: 1, sm: 2, md: 5 }}>

                    <DrawerHeader />

                    {props.children}
                </Box>
            </Main>
        </Box >
    );
}
