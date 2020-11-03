import React,  { useState} from "react";
import { useFormData } from '../../context/formDataContext'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
    const { submitForm } = useFormData()
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
  }); 
    const handleChange = (e) => {
      setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault()
        submitForm(formData)
    };
      
    return (

     
        <form>
          <TextField
            name="fname"
            label="First Name"
            value={formData.fname}
            onChange={handleChange}
            color="secondary"
            required
          />
          <br />
          <TextField
            name="lname"
            label="Last Name"
            value={formData.lname}
            onChange={handleChange}
            color="secondary"
            required
          />
          <br />
          <TextField
            name="email"
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            color="secondary"
            required
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            value="submit form"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </form>
    
    );
  }


export default Login;
