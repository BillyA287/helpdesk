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
import Grid from "@material-ui/core/Grid";
import StaffTextFields from "../custom.staff-input/staff-textInput.component";
import Navigation from "../navigation/nav.component";
import MuiAlert from "@material-ui/lab/Alert";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//icon imports

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
// dialog imports
import { FormsContext } from "../../context/forms.context";
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
    marginTop: "60px",
  },
}));

function Staff(props) {
  const classes = useStyles();

  console.log(props);

  const { staffRows } = useContext(FormsContext);
  const [newStaffRows, setNewStaffRows] = staffRows;

  //dialog
  const [open, setOpen] = useState(false);
  const [currentStaffId, setCurrentStaffId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  //delete staff call back function is invoked to allow us to access the id value which is defined within the map function on within the table
  const handleStaffDelete = (id) => {
    handleClickOpen();
    setCurrentStaffId(id);
  };

  // this function is called to iterate through the specific ID of the item row within the table first cheking the ID is present before deleting to specific row then returnong the state back to null preventing the button from being clicked twice
  const deleteStaff = (id) => {
    if (!id) return;
    handleCloseDialog();
    setNewStaffRows(newStaffRows.filter((item) => id !== item.id));
    setCurrentStaffId(null);
  };

  //effect hook to save information on browser
  useEffect(() => {
    const data = localStorage.getItem("staff-list");
    if (data) {
      setNewStaffRows(JSON.parse(data));
    }
  }, [setNewStaffRows]);

  useEffect(() => {
    localStorage.setItem("staff-list", JSON.stringify(newStaffRows));
  });

  //alert state

  const [staffSnackBarOpen, setStaffSnackBarOpen] = useState(false);

  // stackbar open and close functions
  const handleStaffAddedClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStaffSnackBarOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStaffSnackBarOpen(false);
  };
  // data structure defined for when data is inserted into table, call back values are also destructured here and inserted to the data structure

  const genderData = ({
    gender,
    firstName,
    lastName,
    email,
    contactNumber,
  }) => {
    const info = {
      id: shortid.generate(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      contactNumber: contactNumber,
    };

    setNewStaffRows([...newStaffRows, info]);
    console.log(newStaffRows);
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Navigation />
        <Typography paragraph variant="h4" className={classes.h1}>
          Click 'add staff' to log a new staff member to the table
        </Typography>
        <Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Contact number</TableCell>
                  <TableCell>Delete staff member</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newStaffRows.length > 0
                  ? newStaffRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.firstName}
                        </TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.gender}</TableCell>
                        <TableCell>{row.contactNumber}</TableCell>

                        <TableCell>
                          <IconButton
                            onClick={() => handleStaffDelete(row.id)}
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
                  open={open}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete Staff member?"}
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
                      onClick={() => deleteStaff(currentStaffId)}
                      color="primary"
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>

                <StaffTextFields
                  genderData={genderData}
                  setStaffSnackBarOpen={setStaffSnackBarOpen}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </main>
      <div className={classes.root}>
        <Snackbar
          open={staffSnackBarOpen}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handleClose}
          action={
            <Fragment>
              <IconButton onClick={handleStaffAddedClose}></IconButton>
            </Fragment>
          }
        >
          <Alert onClose={handleClose} severity="success">
            New staff member successfully added!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
export default withRouter(Staff);
