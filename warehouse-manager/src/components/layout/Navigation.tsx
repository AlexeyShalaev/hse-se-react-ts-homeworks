import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

interface NavigationProps {
  onMenuClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onMenuClick }) => {
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
        <Button color="inherit">Products</Button>
        <Button color="inherit">Warehouses</Button>
        <Button color="inherit">About</Button>
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};