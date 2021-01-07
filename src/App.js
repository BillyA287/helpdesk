import React from "react";

import { HashRouter,  Switch, Route} from "react-router-dom";
import Login from "./components/login/login.component";
import Ticket from './components/ticket/ticket.component';

import Staff from './components/staff/staff.component.jsx'
import  Dashboard from "./components/dashboard/dashboard.component";
import "./App.css";

import {FormsProvider} from './context/forms.context'
import { FormDataProvider } from "./context/formDataContext";
import { Settings } from "./components/settings/settings.component";

function App() {



  return (
    
    <HashRouter basename="/">

      <Switch>
        <FormDataProvider>
          <FormsProvider>
            <Route path="/staff">
              <Staff />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/ticket">
              <Ticket />
            </Route>

            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/" exact>
              <Login />
            </Route>
          </FormsProvider>
        </FormDataProvider>
      </Switch>
   </HashRouter>
    
  );
}

export default App;
