import React from 'react';
    import {
      AppBar,
      Toolbar,
      IconButton,
      Typography,
      Button,
      styled,
      Box,
    } from '@mui/material';
    import MenuIcon from '@mui/icons-material/Menu';
    import PersonIcon from '@mui/icons-material/Person';
    import { useNavigate } from 'react-router-dom';

    const StyledAppBar = styled(AppBar)(({ theme }) => ({
      zIndex: theme.zIndex.drawer + 1,
    }));

    interface NavigationProps {
      onMenuClick: () => void;
    }

    export const Navigation: React.FC<NavigationProps> = ({ onMenuClick }) => {
      const navigate = useNavigate();

      return (
        <StyledAppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onMenuClick}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Warehouse Manager
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button color="inherit" onClick={() => navigate('/')}>Products</Button>
              <Button color="inherit" onClick={() => navigate('/categories')}>Categories</Button>
              <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
            </Box>
            <IconButton color="inherit" onClick={() => navigate('/profile')}>
              <PersonIcon />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
      );
    };
