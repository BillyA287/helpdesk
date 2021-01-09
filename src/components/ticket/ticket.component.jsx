import React from "react";
import { useEffect, useContext, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import shortid from "shortid";
//imports for table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import FormDialog from "../custom.ticket-button/custom.ticket.component";
import TicketSelect from "../select-ticket/select.ticket.component";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../navigation/nav.component";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// context api
import { FormsContext } from "../../context/forms.context";

//icon imports
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
// Dialog imports
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  h1: {
    marginTop: "80px",
  },
}));

function Ticket(props) {
  const classes = useStyles();

  console.log(props);

  const { rows } = useContext(FormsContext);
  //global state variable for ID of ticket if user deletes it.
  const [checkTicketId, setCheckTicketId] = useState(null);

  // destructured items from context API
  const [ticketRows, setTicketRows] = rows;

  // mount varibale to confirm if component has remounted when staus is changed by user
  const [isRemount, setIsRemount] = React.useState(false);

  // data structure defined for when data is inserted into table, call back values are also destructured here and inserted to the data structure
  const formDataHandler = ({ desc, option }) => {
    const timeElapsed = Date.now();
    const now = new Date(timeElapsed);

    const date = now.toUTCString();

    const data = {
      description: desc,
      priority: option,
      status: "Pending",
      lastUpdate: date,
      ticketID: shortid.generate(),
    };
    // updating the ticket rows value with what is contained within the data object
    setTicketRows([...ticketRows, data]);
    console.log(ticketRows);
  };

  // hook to parse data
  useEffect(() => {
    const data = localStorage.getItem("ticket-list");
    if (data) {
      setTicketRows(JSON.parse(data));
    }
  }, [isRemount, setTicketRows]);

  //effect hook to save information on browser
  useEffect(() => {
    localStorage.setItem("ticket-list", JSON.stringify(ticketRows));
  });

  // snackbar state
  const [openDialog, setOpenDialog] = useState(false);

  const [ticketAddedOpen, setTicketAddedOpen] = useState(false);

  //snackbar open/ close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleTicketAddedClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setTicketAddedOpen(false);
  };

  //dialog state and functions to open and close it
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //state for updated ticket value
  const [ticketUpdateValue, setTicketUpdateValue] = useState("");

  // function to only update ticket value if the value of ticketUpdateValue
  useEffect(() => {
    if (ticketUpdateValue !== "") {
      setOpen(true);
    }
  }, [ticketUpdateValue]);

  const handleStatusChange = (event, index) => {
    let getTickets = localStorage.getItem("ticket-list");
    if (getTickets) {
      getTickets = JSON.parse(getTickets);
      let ticketToUpdate = getTickets[index];
      if (ticketToUpdate) ticketToUpdate["status"] = event.target.value;

      localStorage.setItem("ticket-list", JSON.stringify([...getTickets]));

      setTicketUpdateValue(event.target.value);

      setIsRemount(!isRemount);
    }
  };

  // function to remove ticket on click
  const handleTicketDelete = (id) => {
    handleClickOpen();
    console.log("what?");
    setCheckTicketId(id);
  };

  const deleteTicket = (ticketID) => {
    if (!ticketID) return;
    handleCloseDialog();
    setTicketRows(ticketRows.filter((item) => ticketID !== item.ticketID));
    setCheckTicketId(null);
  };

  return (
    
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Navigation />

        <Typography variant="h4" className={classes.h1}>
          Click 'add ticket' to log a new ticket to the table
        </Typography>
        <Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Last update</TableCell>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Delete Ticket</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketRows.length > 0
                  ? ticketRows.map((row, index) => (
                      <TableRow key={row.ticketID}>
                        <TableCell component="th" scope="row">
                          {row.description}
                        </TableCell>
                        <TableCell>{row.priority}</TableCell>
                        <TableCell>{row.lastUpdate}</TableCell>
                        <TableCell>{row.ticketID}</TableCell>
                        <TableCell>
                          {" "}
                          <TicketSelect
                            data={{ index: index, value: row.status }}
                            handleStatusChange={handleStatusChange}
                          />
                        </TableCell>

                        <TableCell>
                          <IconButton
                            onClick={() => handleTicketDelete(row.ticketID)}
                            aria-label="delete"
                            color="primary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete Ticket?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Warning! by clicking 'yes' the data will be deleted and
                      cannot be retrieved.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      No
                    </Button>
                    <Button
                      onClick={() => deleteTicket(checkTicketId)}
                      color="primary"
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <FormDialog
                  formData={formDataHandler}
                  setTicketAddedOpen={setTicketAddedOpen}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </main>

      <div>
        <Snackbar
          className={classes.root}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          action={
            <Fragment>
              <IconButton onClick={handleClose}></IconButton>
            </Fragment>
          }
        >
          <Alert onClose={handleClose} severity="warning">
            {`Status has been changed to ${ticketUpdateValue}`}
          </Alert>
        </Snackbar>
       
        <div>
          <Snackbar
            className={classes.root}
            open={ticketAddedOpen}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            onClose={handleTicketAddedClose}
            action={
              <Fragment>
                <IconButton onClick={handleTicketAddedClose}></IconButton>
              </Fragment>
            }
          >
            <Alert onClose={handleTicketAddedClose} severity="success">
              New Ticket successfully added!
            </Alert>
          </Snackbar>
          
        </div>
      </div>
    </div>
  );
}
export default withRouter(Ticket);
