export const groupBy = (objArray = [], key = "") => {
	let result = objArray.reduce((acc, cur) => {
		if (!(cur[key] in acc)) {
			acc[cur[key]] = [];
		}
		acc[cur[key]].push(cur);
		return acc;
	}, {});
	return result;
};
