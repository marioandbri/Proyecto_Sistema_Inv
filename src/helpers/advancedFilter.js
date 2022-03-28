const advancedFilter = (key, query) => {
	return (elem) => {
		if (typeof elem[key] === "string") {
			return (
				elem[key].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
			);
		}
		return (
			Object.values(elem[key])
				.toString()
				.toLowerCase()
				.indexOf(query.toLowerCase()) > -1
		);
	};
};

export default advancedFilter;
