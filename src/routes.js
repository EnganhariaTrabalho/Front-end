import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Import dos componentes.
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Form from "./pages/form/form";
import EditForm from "./pages/form/editForm";
import AdminDashboard from "./pages/admin/dash";
import EditFormAdm from "./pages/admin/admForm";

// Import de API.
import { isAuthenticated } from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginToken: "",
      authed: "",
    };
  }

  //<PrivateRoute exact path="/adm" component={Adm} />
  //<Route exact path="/login/reset" component={Reset} />

  //<Route exact path="/dash" component={Dashboard} />
  //<Route exact path="/" component={Dashboard} />
  //<Route exact path="/admin" component={AdminPanel} />
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/form" component={Form} />
            <PrivateRoute exact path="/edit/:id" component={EditForm} />
            <PrivateRoute exact path="/adm/dashboard" component={AdminDashboard} />
            <PrivateRoute exact path="/adm/edit/:id" component={EditFormAdm} />
            <PrivateRoute path="*" component={() => <h1>Page not Found</h1>} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}