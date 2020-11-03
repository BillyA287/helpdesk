import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FormDataProvider } from "./context/formDataContext";
import Login from "./components/login/login.component";
import Ticket from './components/ticket/ticket.component';
import  {Dashboard}  from "./components/dashboard/dashboard.component";
import "./App.css";

function App() {
  return (

    
    <main>
      <header>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </header>
      <Switch>
        <Route path="/login">
          <FormDataProvider>
            <Login />
          </FormDataProvider>
        </Route>
        <Route path="/dashboard">
          <FormDataProvider>
            <Dashboard />
          </FormDataProvider>
        </Route>
        <Route path="/ticket">
           <Ticket/>
        </Route>
        
      </Switch>
    </main>
  );
}

export default App;
