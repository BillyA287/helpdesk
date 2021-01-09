import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import SimpleMenu from "./drop.down-menu/drop.down-component";

export default function FormDialog({ formData, setTicketAddedOpen }) {
  const [open, setOpen] = React.useState(false);
  const [desc, setDesc] = React.useState("");
  const [option, setOption] = React.useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [optionErrorMsg, setoptionErrorMsg] = useState("");
  // functions to open the dialog form
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //  call back function to retrieve the value of the option the user selects.
  const optionHandler = (option) => {
    setOption(option);
  };

  // logic for the description field
  const handleSubmit = () => {
    //Reset error
    setError(false);
    setErrorMsg("");
    setoptionErrorMsg("");

    const validate = new RegExp(/[A-Za-z]/).test(desc);

    if (!desc.length > 0) {
      setErrorMsg("Description field cannot be empty");
      setError(true);
      return;
    }
    if (!validate) {
      setErrorMsg("Only letters permitted");
      setError(true);
      return;
    }

    if (!option) {
      setoptionErrorMsg("Option field cannot be empty!");
      setError(true);
      return;
    }

    //Submit data
    formData({ desc, option });

    //Reset the form inputs
    setDesc("");
    setOption("");

    //Close Modal afetr submit
    handleClose();
    //set snackbar open
    setTicketAddedOpen(true);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add ticket
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter in a description of the current issue you are facing
            also remembering to select if it is 'High ' or 'Low' priority
          </DialogContentText>
          <TextField
            required
            error={error}
            helperText={error && errorMsg}
            name="description"
            variant="outlined"
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
          />
          <SimpleMenu option={optionHandler} />
          <p style={{ color: "red", fontsize: 12 }}>
            {error && optionErrorMsg}
          </p>
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
   </Fragment>
  );
}
