import React from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Styled from "styled-components";
import { useFormData } from "../../context/formDataContext";

// icon import
import SettingsIcon from "@material-ui/icons/Settings";

//component
import Navigation from "../navigation/nav.component";

export const Settings = () => {
  const { globalFormData } = useFormData();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    header: {
      padding: "100px",
    },
    icon: {
      fontSize: "80px",
    },
    loginData: {
      lineHeight: "2.5",
    },
  }));

  const classes = useStyles();
  const UserCredentials = Styled.div`
display: flex;

justify-content: flex-end;

margin-top: 100px;

`;

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Navigation />
        <Grid container spacing={1}>
          <Grid
            container
            direction="column"
            justifycontent="center"
            alignItems="center"
          >
            <UserCredentials>
              <SettingsIcon className={classes.icon} />
              <Typography className={classes.loginData}>
                Settings version 1.0
                <br />
                Current user logged in {globalFormData.fname}{" "}
                {globalFormData.lname}
                <br />
                Email: {globalFormData.email}
              </Typography>
            </UserCredentials>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
