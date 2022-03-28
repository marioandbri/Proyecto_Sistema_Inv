import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import MovementDetail from "./MovementDetail";
import MovementsList from "./MovementsList";
import JobInit from "./JobInit";
import "./styles.css";

const Index = () => {
	return (
		<div className="box">
			<div className="title">Movimientos</div>
			<Switch>
				<Route exact path="/movimientos">
					<MovementsList />
				</Route>
				<Route path="/movimientos/detalle/:id">
					<MovementDetail />
				</Route>
				<Route path="/movimientos/OT">
					<JobInit />
				</Route>
			</Switch>
		</div>
	);
};

export default Index;
