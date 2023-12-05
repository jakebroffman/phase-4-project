import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SneakersPage from './SneakersPage';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/sneakers" component={SneakersPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
