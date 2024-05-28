import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SupportIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import gmail1 from "../images/gmail.png";
import { Avatar, Grid } from '@mui/material';
import lens2 from '../images/lens2.png';
import { auth } from '../firebase/setup';
import Profile from './Profile';

export default function Navbar(props) {
  return (
    <Grid container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          elevation={0}
          position="static"
          sx={{ position:"fixed", top:"0", zIndex:"2", backgroundColor: "#f9f9f9", minHeight: "5vw", minWidth: "100vw", paddingTop: "7px", paddingRight: "30px" }}
        >
          <Toolbar style={{ marginLeft:"2vw", display:"flex", alignItems:"center" }}>
            <Grid item xs={2}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: "0.8vw", color: "#3c3c3c" }}>
                  <MenuIcon sx={{ width: "2vw" }} />
                </IconButton>
                <img style={{ marginLeft:"2vw", width: "2.3vw" }} src={gmail1} alt="Gmail Logo" />
                <Typography sx={{ color: "#3c3c3c", marginLeft: "1vw", fontSize: "1.6vw" }} variant="h6" component="div">
                  Gmail
                </Typography>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div
                style={{
                  marginLeft: "3vw",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "40px",
                  backgroundColor: "#e4effa",
                  width: "55vw",
                  height: "3.7vw"
                }}
              >
                <box-icon  name="search-alt-2" alt="Search Icon" style={{ width: "1.3vw", height: "1.3vw", alignItems: "center", marginLeft: "15px" }} />
                <input onChange={(e) => props.setSearch(e.target.value)}
                  placeholder="Search mail"
                  style={{
                    marginLeft: "10px",
                    height: "3vw",
                    width: "45vw",
                    backgroundColor: "#e4effa",
                    border: "none",
                    outline: "none"
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={3} style={{ marginRight:"3vw",display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <IconButton edge="end" color="inherit" sx={{ color: "#3c3c3c" }}>
                <SupportIcon sx={{ width: "2vw" }} />
              </IconButton>
              <IconButton edge="end" color="inherit" sx={{ color: "#3c3c3c" }}>
                <SettingsIcon sx={{ width: "2vw" }} />
              </IconButton>
              <IconButton edge="end" color="inherit" sx={{ color: "#3c3c3c" }}>
                <AppsIcon sx={{ width: "2vw" }} />
              </IconButton>
              <Profile />
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </Grid>
  );
}
