import React from 'react';
    import { useSelector } from 'react-redux';
    import {
      Box,
      Card,
      CardContent,
      Avatar,
      Typography,
      List,
      ListItem,
      ListItemText,
      ListItemIcon,
    } from '@mui/material';
    import PersonIcon from '@mui/icons-material/Person';
    import EmailIcon from '@mui/icons-material/Email';
    import GroupIcon from '@mui/icons-material/Group';
    import { RootState } from '@/store/store';

    export const ProfilePage: React.FC = () => {
      const user = useSelector((state: RootState) => state.user.data);

      if (!user) {
        return <Typography>No user data available</Typography>;
      }

      return (
        <Box>
          <Typography variant="h4" gutterBottom>Profile</Typography>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{ width: 100, height: 100, mr: 3 }}
                />
                <Box>
                  <Typography variant="h5">{user.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {user.group}
                  </Typography>
                </Box>
              </Box>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Name"
                    secondary={user.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={user.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Group"
                    secondary={user.group}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      );
    };
