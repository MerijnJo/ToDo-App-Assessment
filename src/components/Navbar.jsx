import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { 
  AppBar, Toolbar, IconButton, Typography, Drawer, 
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Box, useMediaQuery, useTheme 
} from '@mui/material';

const drawerWidth = 256;

export default function Navbar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 4, px: 2, pt: 2 }}>
        Task Viewer
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/" 
            selected={location.pathname === '/'}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(63, 81, 181, 0.08)',
                borderRight: '4px solid #3F51B5',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: location.pathname === '/' ? 'primary.main' : 'inherit' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </ListItemIcon>
            <ListItemText primary="To do page" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/about"
            selected={location.pathname === '/about'}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(63, 81, 181, 0.08)',
                borderRight: '4px solid #3F51B5',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: location.pathname === '/about' ? 'primary.main' : 'inherit' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </ListItemIcon>
            <ListItemText primary="About" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

    return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isMobile && (
        <AppBar position="fixed" elevation={1} sx={{ bgcolor: '#fff', color: 'text.primary' }}>
          <Toolbar>
            <IconButton color="primary" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </IconButton>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Tasks
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.default', borderRight: '1px solid #ddd9de' } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, width: { md: `calc(100% - ${drawerWidth}px)` }, mt: { xs: 8, md: 0 } }}>
        {children}
      </Box>
    </Box>
    );
}