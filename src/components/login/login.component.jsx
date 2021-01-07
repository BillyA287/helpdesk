import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useFormData } from "../../context/formDataContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Billy Atim
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  //value destructured from context API
  const { submitForm } = useFormData();
  //setting initial state
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const [error, setError] = useState(false);

  const [fNameErr, setfNameErrMsg] = useState("");
  const [lNameErr, setlNameErrMsg] = useState("");
  const [emailErr, setEmailErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErrMsg] = useState("");

  //validation values to test input fields against
  const validate = new RegExp(/[A-Za-z]/).test(
    formData.fname && formData.lname
  );

  const validateEmail = new RegExp(/\S+@\S+\.\S+/).test(formData.email);

  const handleChange = (e) => {
    e.persist();

    setFormData((formData) => ({
      ...formData,
      password,
      [e.target.name]: e.target.value,
    }));
  };

  // logic and submission of user forms when it has passed all validation checks
  const onSubmit = (e) => {
    setfNameErrMsg("");
    setlNameErrMsg("");
    setEmailErrMsg("");
    setPasswordErrMsg("");
    e.preventDefault();

    if (
      !formData.fname.length &&
      !formData.lname.length &&
      !formData.email.length > 0
    ) {
      setfNameErrMsg("Input fields cannot be empty");
      setlNameErrMsg("Input fields cannot be empty");
      setEmailErrMsg("Input fields cannot be empty");

      setError(true);
      return;
    }

    if (!validate) {
      setfNameErrMsg("Only letters permitted");
      setlNameErrMsg("Only letters permitted");
      setError(true);
      return;
    }

    if (!validateEmail) {
      setEmailErrMsg("Please enter a valid email address");
      setError(true);
      return;
    }
    if (!password.length > 0) {
      setPasswordErrMsg("Password is required");
      setError(true);
      return;
    }

    submitForm(formData);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
                value={formData.fname}
                error={error}
                helperText={error && fNameErr}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                onChange={handleChange}
                value={formData.lname}
                error={error}
                helperText={error && lNameErr}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email}
                error={error}
                helperText={error && emailErr}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
                helperText={error && "Password is required"}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value="submit form"
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
