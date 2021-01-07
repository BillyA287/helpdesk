import React, { useContext, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//icon imports
import BugReportIcon from "@material-ui/icons/BugReport";
import PeopleIcon from "@material-ui/icons/People";

//components
import SimpleCard from "../materialUI-card/card.component";
import Navigation from "../navigation/nav.component";
// context API 
import { FormsContext } from "../../context/forms.context";

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
  h1: {
    marginTop: "50px",
  },
}));

export const Dashboard = (props) => {
  const classes = useStyles();

  const { staffRows, rows } = useContext(FormsContext);
  const [newStaffRows, setNewStaffRows] = staffRows;
  const [ticketRows, setTicketRows] = rows;

  // hook to parse data

  useEffect(() => {
    const ticketData = localStorage.getItem("ticket-list");
    if (ticketData) {
      setTicketRows(JSON.parse(ticketData));
    }
    const staffData = localStorage.getItem("staff-list");
    if (staffData) {
      setNewStaffRows(JSON.parse(staffData));
    }
  }, [setNewStaffRows, setTicketRows]);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Navigation />

        <Grid container spacing={2} justify="center">
          <Grid item xs={8} sm={8} md={12} lg={12}>
            <Typography variant="h5" className={classes.h1}>
              Outstanding task(s)
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8} md={6} lg={5}>
            <Link to={"/ticket"} style={{ textDecoration: "none" }}>
              <SimpleCard
                icon={<BugReportIcon />}
                data={ticketRows}
                title="Ticket(s)"
              />
            </Link>
          </Grid>

          <Grid item xs={12} sm={8} md={6} lg={5}>
            <Link to={"/staff"} style={{ textDecoration: "none" }}>
              <SimpleCard
                icon={<PeopleIcon />}
                data={newStaffRows}
                title="Staff"
              />
            </Link>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
export default withRouter(Dashboard);
