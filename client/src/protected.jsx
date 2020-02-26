import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        JSON.parse(sessionStorage.getItem("logIn")) &&
        JSON.parse(sessionStorage.getItem("logIn")).role === "admin" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
