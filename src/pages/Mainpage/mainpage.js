import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from "../Dashboard/dashboard";
import Login from "../login/login";
import Signup from "../signup/signup";

const isLogin = () => {
  let token = localStorage.getItem("token") || "";
  return token ? true : false;
};
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (isLogin() ? <Component /> : <Redirect to="/login" />)}
    />
  );
};
const Mainpage = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <PublicRoute exact component={Signup} path="/signup" />
          {/* {
            exact : true,
            component :<Signup/>,
            path:"/signup"
          } */}

          <PublicRoute component={Login} path="/login" />
          <PrivateRoute component={Dashboard} path="/" />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default Mainpage;

//destructuring
// let a = {
//   name: "purushoth",
//   age: 23
// };
// console.log(a.name);
// console.log(a.age);
// const { name, age } = a;
// console.log(name);
// console.log(age);
