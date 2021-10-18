import Inventario from "../model/inventario";

export async function createInventario(req, res) {
   const body = req.body;
   console.log(body)
   res.json(body)
}
export async function getInventarioByQuery(req, res) {
   res.status(200).json({ message: "ruta inventario funcionando correctamente" })
}
export async function getInventarioBySerialNumber(req, res) {

}
export async function updateInventario(req, res) {

}
export async function deleteInventario(req, res) {

}