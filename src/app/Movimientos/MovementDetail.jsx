import React from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFetch } from "../useFetch";
import DetailView from "./DetailView";
const MovementDetail = () => {
	const { id } = useParams();
	const { data, loading } = useFetch(`/mov/detalle/${id}`);
	let history = useHistory();
	const GoBack = () => {
		history.goBack();
	};
	return (
		<React.Fragment>
			<button className="button is-info mb-2" onClick={GoBack}>
				<span className="icon mr-1">
					<i className="fas fa-angle-left"></i>
				</span>{" "}
				Volver a Lista
			</button>
			{/* <div>{id}</div> */}
			{!loading && <DetailView data={data} />}
		</React.Fragment>
	);
};

export default MovementDetail;
