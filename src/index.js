import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-xyewrgkv.eu.auth0.com"
    clientId="5ZqJXhmb2Gn3b1wWkhMsWQyq4xGcxJHO"
    redirectUri={window.location.origin}
  
  >
    {console.log(process.env.REACT_APP_DOMAIN)}
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);