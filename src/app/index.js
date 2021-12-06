import { BrowserRouter as Router } from "react-router-dom"
import React from 'react';
import { render } from "react-dom";
import AppProvider from "./AppProvider.js";

import App from './app.js';


render(<Router>
  <AppProvider>

    <App />
  </AppProvider>
</Router>
  , document.getElementById('app'));