import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {generate} from 'shortid'
import {useState} from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container'

import FormDialog from '../custom.ticket-button/custom.ticket.component';





const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




// const [rows, setRows] = useState([{
//     id: '',
//     description: 'y',
//     priority: 'g',
//     lastUpdate: 'd',
//     ticketID: 'f'
    
// }])


export default function BasicTable() {
  const classes = useStyles();
 const [description, setDescription] = useState(""); 
   const [priority, setPriority] = useState("");  
   
   let row = [
     {
       id: 0,
       description: 'yoooty',
       priority: 'g',
       lastUpdate: 'd',
       ticketID: 'f'
      },
    ];
    const [rows, setRows] = useState(row);  


  const formDataHandler = ({desc, option})=>{
    
      const data = {
        id: 1,
        description: desc,
       priority: option,
       lastUpdate: Date.now(),
       ticketID: `#${Math.floor(Math.random() * 10) + 1}`

      };
    
  setRows([...rows, data])
      console.log(rows)


  }
 
  return (
    <Container maxWidth="lg">
      <Grid >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell >Priority</TableCell>
                <TableCell >Last update</TableCell>
                <TableCell >Ticket ID</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.ticketID}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell >{row.description}</TableCell>
                  <TableCell >{row.priority}</TableCell>
                  <TableCell >{row.lastUpdate}</TableCell>
                  <TableCell >{row.ticketID}</TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <FormDialog formData={formDataHandler} />
    </Container>
    
  );
}
