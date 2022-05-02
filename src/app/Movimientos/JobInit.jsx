import React, { useState } from "react";
import ClientSelector from "./ClientSelector";
import Steps from "../FormComponents/Steps";
import Card from "../FormComponents/Card";
import ProductSelector from "./ProductSelector";
import { string } from "yup";

const JobInit = () => {
	/**
	 * @type {[import("../../types").EmpresaModel, import("react").Dispatch<import("../../types").EmpresaModel>]}
	 */
	const [selectedClient, setSelectedClient] = useState(null);
	/**
	 * @type {[import("../../types").ProductoModel, import("react").Dispatch<import("../../types").ProductoModel>]}
	 */
	const [selectedProduct, setSelectedProduct] = useState(null);
	const initialSteps = [
		{
			active: true,
			completed: false,

			icon: (
				<>
					<ClockIcon />
				</>
			),
			title: "Seleccione Empresa",
			description:
				"Escriba en el cuadro de busqueda y haga click en la empresa cliente",
		},
		{
			active: false,
			completed: false,

			icon: (
				<>
					<ClockIcon />
				</>
			),
			title: "Seleccione Producto/s",
			description:
				"Busque los productos de la lista, seleccione cantidad y modificaciones",
		},
		{
			active: false,
			completed: false,

			icon: (
				<>
					<ClockIcon />
				</>
			),
			title: "Step",
			description: "This is a step",
		},
		{
			active: false,
			completed: false,

			icon: (
				<>
					<ClockIcon />
				</>
			),
			title: "Step",
			description: "This is a step",
		},
	];
	const [steps, setSteps] = useState(initialSteps);
	// console.log(selectedClient);
	const nextStep = (index) => {
		setSteps((oldSteps) => {
			const newSteps = [...oldSteps];
			newSteps[index].completed = true;
			newSteps[index].active = false;
			newSteps[index].icon = (
				<>
					<CheckIcon />
				</>
			);
			newSteps[index + 1].active = true;
			return newSteps;
		});
	};
	/**
	 *
	 * @param {import("../../types").EmpresaModel} empresa
	 */
	const selectClient = (empresa) => {
		nextStep(0);
		setSelectedClient(empresa);
	};
	/**
	 *
	 * @param {import("../../types").ProductoModel} producto
	 */
	const selectProduct = (producto) => {
		nextStep(1);
		setSelectedProduct(producto);
	};
	return (
		<React.Fragment>
			<Steps steps={steps} />
			{steps[0].completed && (
				<Card
					style={{ marginBottom: "1em" }}
					title={selectedClient.razon_social}
					subtitle={selectedClient.rut}
					content={selectedClient.ubicacion}
				/>
			)}
			{steps[1].completed && (
				<Card
					style={{ marginBottom: "1em" }}
					title={selectedProduct.shortDescription}
					subtitle={selectedProduct.partnumber}
					content={selectedProduct.extraDescription}
				/>
			)}
			{steps[0].active && <ClientSelector setSelected={selectClient} />}
			{steps[1].active && <ProductSelector setSelected={selectProduct} />}
		</React.Fragment>
	);
};

const CheckIcon = () => (
	<span className="icon">
		<i className="fa fa-check"></i>
	</span>
);
const ClockIcon = () => (
	<span className="icon">
		<i className="fa fa-clock"></i>
	</span>
);

export default JobInit;
