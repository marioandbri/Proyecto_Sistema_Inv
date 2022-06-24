import React, { useState } from "react";
import ClientSelector from "./ClientSelector";
import Steps from "../FormComponents/Steps";
import Card from "../FormComponents/Card";
import ProductSelector from "./ProductSelector";
import { useSteps } from "../CustomHooks/steps";
import { CheckIcon, ClockIcon } from "../Icons";
import ProductCard from "./ProductCard";
import EmpresaCard from "./EmpresaCard";
import { useHistory } from "react-router-dom";

/**
 * @typedef {import("../../types").MovimientoModel} Movimiento
 * @typedef {import("../../types").PedidoMovimiento} Pedido
 * @typedef {import("../../types").EmpresaModel} Empresa
 * @typedef {import("../../types").ProductoModel} Producto
 * @typedef {React.Dispatch<React.SetStateAction<Empresa>>} setEmpresa
 * @typedef {React.Dispatch<React.SetStateAction<Producto[]>>} setProductos
 * @typedef {import("../../types").Step} Step
 */


const JobInit = () => {
	/**
	 * @type {[Empresa, setEmpresa]}
	 */
	const [selectedClient, setSelectedClient] = useState(null);
	/**
	 * @type {[Producto[], setProductos]}
	 */
	const [selectedProduct, setSelectedProduct] = useState([]);

	const [cantidades, setCantidades] = useState([]);
	const [date, setDate] = useState("");
	/**
	 * @type {Partial<Step>[]}
	 */
	const initialSteps = [
		{
			title: "Seleccione Empresa",
			description:
				"Escriba en el cuadro de busqueda y haga click en la empresa cliente",
		},
		{
			title: "Seleccione Producto/s",
			description:
				"Busque los productos de la lista, seleccione cantidad y modificaciones",
		},
		{
			title: "Revise y modifique",
			description:
				"Confirme los datos de la orden, y revise antes de continuar",
		},
		{
			title: "Finalizado",
			description: "La orden ha sido creada",
		},
	];
	const { steps, previousStep, nextStep } = useSteps(initialSteps);

	const history = useHistory()

	/**
	 *
	 * @param {import("../../types").EmpresaModel} empresa
	 */
	const selectClient = (empresa) => {
		nextStep();
		setSelectedClient(empresa);
	};
	/**
	 *
	 * @param {import("../../types").ProductoModel} producto
	 */
	const selectProduct = (producto) => {
		let newProducts = [...selectedProduct, producto];
		setSelectedProduct(newProducts);
	};

	const removeSelectedProduct = (index) => {
		setSelectedProduct((productos) => {
			let newProducts = [...productos];
			newProducts.splice(index, 1);
			return newProducts;
		});
		setCantidades((oldCantidades) => {
			let newCantidades = [...oldCantidades];
			newCantidades.splice(index, 1);
			return newCantidades;
		});
	};

	const handleInput = (index) => (key) => (ev) => {
		let producto = [...selectedProduct];
		producto[index].detalle[key] = ev.target.value;
		setSelectedProduct(producto);
	};

	const handleCantidad = (index) => (e) => {
		setCantidades((oldCantidades) => {
			let newCantidades = [...oldCantidades];
			newCantidades[index] = e.target.value;
			return newCantidades;
		});
	};

	const buildOrder = () => {
		const repeat = (objeto, cantidad) => {
			let container = [];
			for (let i = 0; i < cantidad; i++) {
				container = [...container, objeto];
			}
			return container;
		};

		const pedido = [];

		selectedProduct.forEach((e, index) => {
			pedido.push(
				...repeat(
					{
						partnumber: e.partnumber,
						modificaciones: e.detalle,
						orientacion: "entrega",
					},
					cantidades[index]
				)
			);
		});

		/**
		 * @type {Movimiento}
		 */
		const order = {
			rut: selectedClient.rut,
			tipo: "ENTREGA",
			estado: "Laboratorio",
			fechaCreacion: new Date().toISOString(),
			fechaMovimiento: date,
			guia: new Date().toISOString() + Math.ceil(Math.random() * 10),
			pedido: pedido,
		};

		return order;
	};

	const confirmOrder = async () => {
		nextStep();
		const result = await createOrder(buildOrder());
		if (result.ok) {
			const response = await result.json();
			console.log(response);
		} else {
			console.log({ message: "Error en solicitud" });
		}
	};

	const createOrder = async (order) => {
		const request = await fetch("/mov", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
		});
		return request;
	};
	return (
		<React.Fragment>
			<Steps steps={steps} />
			{steps[0].completed && (
				<EmpresaCard
					date={date}
					setDate={setDate}
					selectedClient={selectedClient}
				/>
			)}
			{(steps[1].active || steps[1].completed) &&
				selectedProduct.map((producto, index) => (
					<ProductCard
						key={index}
						producto={producto}
						handleInput={handleInput(index)}
						cantidad={cantidades[index]}
						handleCantidad={handleCantidad(index)}
						removeSelectedProduct={() => removeSelectedProduct(index)}
					/>
				))}
			{steps[0].active && <ClientSelector setSelected={selectClient} />}
			{steps[1].active && (
				<ProductSelector
					setSelected={selectProduct}
					handleClick={() => nextStep()}
				/>
			)}
			{steps[2].active && (
				<button
					onClick={confirmOrder}
					style={{ width: "100%" }}
					className="button is-success is-large"
				>
					Confirmar
				</button>
			)}
			{steps[3].active && (
				<button onClick={() => history.push("/movimientos")}
					style={{ width: "100%" }}
					className="button is-success is-large">
					Finalizar
				</button>
			)

			}
		</React.Fragment>
	);
};

export default JobInit;
