import React, {} from "react"

import { useFormData } from '../../context/formDataContext'
import { makeStyles} from "@material-ui/core/styles";

import Ticket from '../ticket/ticket.component'


import Styled from "styled-components"

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/MenuItem";

import Grid from "@material-ui/core/Grid"

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Container } from "@material-ui/core";



// for App bar 
 const useStyles = makeStyles((theme) => ({
  
   root: {
     flexGrow: 1,
   },
   menuButton: {
     marginRight: theme.spacing(1),
   },
   title: {
     flexGrow: 1,
   },
 }));

 // context api hook
 export const  Dashboard = (props) => {
    const { globalFormData } = useFormData();
 const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    

const UserCredentials = Styled.div `
display: flex;
justify-content: center;

margin-top: 50px;

`


const tabs = (
  <React.Fragment>
  <Grid> 
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      style={{width: 150, margin: '35px'}}
      onChange={handleChange}
      aria-label="Vertical tabs example"
   
    >
      
      <Tab label="Dashboard" />
      <Tab label="Status" />
      <Tab label="Categories"  />
      <Tab label="Tickets" Linkto='../ticket/ticket.component.jsx'/>
      <Tab label="Log out" />
   
    </Tabs>
    </Grid>
  </React.Fragment>
);



        return (
          <div className={classes.root}>
            <div className="user-details">
              <Container>
                <Grid>
                  <UserCredentials>
                    First Name: {globalFormData.fname}
                    <br />
                    Last Name: {globalFormData.lname}
                    <br />
                    Email: {globalFormData.email}
                  </UserCredentials>
                </Grid>
              </Container>
            </div>

            {tabs}

            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  News
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
        );
    
}
