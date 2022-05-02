import React, { useState } from "react";
import Panel from "../FormComponents/Panel";
import { useFetch } from "../useFetch";
import { useFilter } from "../useFilter";
import LoadingBar from "../LoadingBar";

/**
 * @typedef {import("../../types").DataPanelSelectorProps} DataPanelProps
 * @param {DataPanelProps} param0
 * @returns
 */
const DataPanelSelector = ({
	urlToFetch = "/",
	title,
	mapCallback = (item, index) => <a className="panel-block">{index}</a>,
}) => {
	const { data, loading } = useFetch(urlToFetch);
	const [query, setQuery] = useState("");
	const handleQuery = () => (event) => {
		setQuery(event.target.value);
	};
	const filteredData = useFilter(query, data);
	const list = filteredData.splice(0, 10);
	return (
		<>
			{!loading && (
				<Panel
					query={query}
					setQuery={handleQuery}
					title={title}
					mapCallback={mapCallback}
					data={list}
				/>
			)}
			{loading && <LoadingBar />}
		</>
	);
};

export default DataPanelSelector;
