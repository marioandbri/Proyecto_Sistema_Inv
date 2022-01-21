import { BrowserRouter as Router } from "react-router-dom";
// import React from "react";
import { render } from "react-dom";
import AppProvider from "./AppProvider.js";

import App from "./app.js";

import React, { Component } from "react";
if (module.hot) {
	module.hot.accept();
}
export default class Index extends Component {
	render() {
		return (
			<Router>
				<AppProvider>
					<App />
				</AppProvider>
			</Router>
		);
	}
}

render(<Index />, document.getElementById("app"));
