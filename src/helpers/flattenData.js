export const flattenData = (data, result = {}, preKey = "") => {
	for (let key in data) {
		let keyName = preKey + key;
		if (typeof data[key] === "object") {
			flattenData(data[key], result, (key += "."));
		} else {
			result[keyName] = data[key];
		}
	}
	return result;
};
