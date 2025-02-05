import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {ListItemButton} from "@mui/material";

export default function PrimarySearchAppBar() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') {
            return;
        }
        setDrawerOpen(open);
    };

    const jumpPage = (url: string) => {
        location.href = url;
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{mr: 2}}
                                onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{display: {xs: 'none', sm: 'block'}}}>
                        記！記帳！
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                            {/*todo 設定 badgeContent={0}*/}
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton size="large" edge="end" aria-label="account of current user"
                                    aria-haspopup="true" color="inherit">
                            <AccountCircle/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}
                     onKeyDown={toggleDrawer(false)}>
                    <List>
                        <ListItemButton onClick={() => jumpPage("/category")}>
                            <ListItemText primary={"消費類別"}/>
                        </ListItemButton>
                        <ListItemButton onClick={() => jumpPage("/transaction")}>
                            <ListItemText primary={"交易紀錄"}/>
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}