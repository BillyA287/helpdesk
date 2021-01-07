import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import SelectGender from "../select-gender/select-gender.component";

import { makeStyles } from "@material-ui/core/styles";

export default function FormDialog({ genderData, setStaffSnackBarOpen }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [gender, setGender] = React.useState("");
  const [firstName, setFirstname] = React.useState("");
  const [lastName, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contactNumber, setContactnumber] = React.useState("");

  const [error, setError] = useState(false);
  const [optionErrorMsg, setoptionErrorMsg] = useState("");

  const [fNameErr, setfNameErrMsg] = useState("");
  const [lNameErr, setlNameErrMsg] = useState("");
  const [numberErr, setNumberErrMsg] = useState("");
  const [emailErr, setEmailErrMsg] = useState("");

  // logic and validation for input fields/ setting snackbar to display when all data is submitted.
  const handleSubmit = () => {
    //Reset error
    setError(false);
    setoptionErrorMsg("");

    setfNameErrMsg("");
    setlNameErrMsg("");
    setNumberErrMsg("");
    setEmailErrMsg("");

    const validateFirst = new RegExp(/[A-Za-z]/).test(firstName);

    const validateLast = new RegExp(/[A-Za-z]/).test(lastName);

    const validateNumbers = new RegExp(/^[0-9]+$/).test(contactNumber);

    const validateEmail = new RegExp(/\S+@\S+\.\S+/).test(email);

    if (
      !firstName.length &&
      !lastName.length &&
      !email.length &&
      !contactNumber > 0
    ) {
      setfNameErrMsg("Input fields cannot be empty");
      setlNameErrMsg("Input fields cannot be empty");
      setNumberErrMsg("Input fields cannot be empty");
      setEmailErrMsg("Input fields cannot be empty");
      setError(true);
      return;
    }

    if (!validateFirst) {
      setfNameErrMsg("Only letters permitted");
      setError(true);
      return;
    }

    if (!validateLast) {
      setlNameErrMsg("Only letters permitted");
      setError(true);
      return;
    }

    if (!validateNumbers) {
      setNumberErrMsg("Only numbers permitted");
      setError(true);
      return;
    }

    if (!gender) {
      setoptionErrorMsg("Option field cannot be empty!");
      setError(true);
      return;
    }

    if (!validateEmail) {
      setEmailErrMsg("Please enter a valid email address");
      setError(true);
      return;
    }

    //Submit data
    genderData({ gender, firstName, lastName, email, contactNumber });

    //Reset the form inputs
    setFirstname("");
    setLastname("");
    setGender("");
    setContactnumber("");
    setEmail("");

    handleClose();

    setStaffSnackBarOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add new staff member
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new staff member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all fields to add a new member of staff
          </DialogContentText>
          <TextField
            required
            error={error}
            helperText={error && fNameErr}
            autoFocus
            onChange={(e) => setFirstname(e.target.value)}
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            size="medium"
            value={firstName}
          />

          <TextField
            required
            error={error}
            helperText={error && lNameErr}
            style={{ margin: 9 }}
            autoFocus
            onChange={(e) => setLastname(e.target.value)}
            margin="dense"
            name="lastName"
            label="Last name"
            type="text"
            size="medium"
            value={lastName}
          />
          <br></br>
          <TextField
            autoFocus
            required
            error={error}
            helperText={error && emailErr}
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Email Address"
            type="email"
            size="medium"
            value={email}
          />
          <SelectGender
            gender={gender}
            setGender={setGender}
            onChange={(e) => setGender(e.target.value)}
            required
            error={error}
            helperText={error && optionErrorMsg}
          />
          <p style={{ color: "red", fontsize: 12 }}>
            {error && optionErrorMsg}
          </p>
          <br></br>
          <TextField
            autoFocus
            onChange={(e) => setContactnumber(e.target.value)}
            margin="dense"
            name="contactNumber"
            label="Contact number"
            size="medium"
            value={contactNumber}
            required
            error={error}
            helperText={error && numberErr}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
