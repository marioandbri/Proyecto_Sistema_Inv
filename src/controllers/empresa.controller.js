import { NativeError } from "mongoose";
import Empresa from "../model/empresa";

/**
 * @typedef {import("../types").ExpressRouterRequest} RouteRequest
 * @typedef {import("../types").ExpressRouterFunction} RouterFunction
 * @typedef {import("../types").EmpresaModel} Empresa
 */

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
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

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function getEmpresaByRut(req, res) {
	const rut = req.params.rut;
	/**
	 * @type {NativeError | Empresa}
	 */
	const empresa = await Empresa.findOne({ rut: rut }, (err, doc) => {
		if (err) {
			console.error(err);
			return err;
		}
		return doc;
	});
	return res.json(empresa);
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function postEmpresas(req, res) {
	const data = req.body;
	await Empresa.create(data, (err, doc) => {
		if (err) return res.status(400).json(err);
		res.json(doc);
	});
	return;
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function updateEmpresa(req, res) {
	const data = req.body;
	const { rut } = req.params;
	const result = await Empresa.updateOne({ rut: rut }, data, {}, (err, doc) => {
		if (err) {
			console.error(err);
			return err;
		}
		return doc;
	});
	console.log(result);
	return res.json(result);
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
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
