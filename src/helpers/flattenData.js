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
export const lookupData = (data) => {
	const flatData = flattenData(data);
	let resultData = Object.entries(flatData).filter(
		([key, value]) =>
			!(
				key.includes("id") ||
				key.includes("rutProveedor") ||
				key.includes("rutPoseedor") ||
				key.includes("productPN") ||
				key.includes("_v")
			)
	);
	return resultData.map(([key, value]) => [key.toUpperCase(), value]);
};
