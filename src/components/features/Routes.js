import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from '../pages/home'
import APIcomponent from '../pages/APIpage'
import GetAPIData from '../pages/flightTracker'

function Routes() {
  return (
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/APIcomponent">
          <APIcomponent />
        </Route>
        <Route exact path="/FlightTester">
          <GetAPIData />
        </Route>
    </Switch>
  );
}

export default Routes;