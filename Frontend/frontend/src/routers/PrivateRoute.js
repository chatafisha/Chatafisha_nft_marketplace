import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, accountId, ...rest }) => {
  const allowedAccountIds = [
    "chatafisha_marketplace.near",
    "chatafisha_nft_marketplace.testnet",
  ];
  // Allowed accountId

  return (
    <Route
      {...rest}
      render={(props) =>
        allowedAccountIds.includes(accountId) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
