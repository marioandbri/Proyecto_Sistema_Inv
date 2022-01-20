import Empresa from "../model/empresa";

export async function getEmpresas(req, res) {
	const query = req.query;
	const parseQuery = (query) => {
		for (let key in query) {
			query[key] = new RegExp(query[key], "i");
		}
	};
	parseQuery(query);
	console.log(query);
	const empresas = await Empresa.find(query, (err, doc) => {
		if (err) {
			console.error(err);
			return err;
		}
		return doc;
	});
	return res.json(empresas);
}

export async function getEmpresaByRut(req, res) {
	const rut = req.params.rut;
	const empresa = await Empresa.findOne({ rut: rut }, (err, doc) => {
		if (err) {
			console.error(err);
			return err;
		}
		return doc;
	});
	return res.json(empresa);
}

export async function postEmpresas(req, res) {
	const data = req.body;
	await Empresa.create(data, (err, doc) => {
		if (err) return res.status(400).json(err);
		res.json(doc);
	});
	return;
}

export async function updateEmpresa(req, res) {
	const data = req.body;
	const { rut } = req.params;
	const result = await Empresa.updateOne({ rut: rut }, data, (err, doc) => {
		if (err) {
			console.error(err);
			return err;
		}
		return doc;
	});
	console.log(result);
	return res.json(result);
}

export async function deleteEmpresa(req, res) {
	const { rut } = req.params;
	const result = await Empresa.deleteOne({ rut: rut }, (err, doc) => {
		if (err) {
			console.error(err);
			return err;
		}
		return doc;
	});
	return res.json(result);
}
