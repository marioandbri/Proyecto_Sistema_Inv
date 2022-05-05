import React, { useState } from "react";
import ClientSelector from "./ClientSelector";
import Steps from "../FormComponents/Steps";
import Card from "../FormComponents/Card";
import ProductSelector from "./ProductSelector";
import { string } from "yup";
import { useSteps } from "../CustomHooks/steps";
import { CheckIcon, ClockIcon } from "../Icons";
import ProductCard from "./ProductCard";

const JobInit = () => {
	/**
	 * @type {[import("../../types").EmpresaModel, import("react").Dispatch<React.SetStateAction<import("../../types").EmpresaModel>>]}
	 */
	const [selectedClient, setSelectedClient] = useState(null);
	/**
	 * @type {[import("../../types").ProductoModel[], import("react").Dispatch<React.SetStateAction<import("../../types").ProductoModel[]>>]}
	 */
	const [selectedProduct, setSelectedProduct] = useState([]);
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
			title: "Step",
			description: "This is a step",
		},
		{
			title: "Step",
			description: "This is a step",
		},
	];
	const { steps, previousStep, nextStep } = useSteps(initialSteps)
	// const [steps, setSteps] = useState(firstSteps);
	// console.log(selectedClient);

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
		let newProducts = [...selectedProduct, producto]
		setSelectedProduct(newProducts);
	};

	const removeSelectedProduct = (index) => {
		setSelectedProduct((productos) => {
			let newProducts = [...productos]
			newProducts.splice(index, 1)
			return newProducts
		})
	}

	const handleInput = (index) => (key) => (ev) => {
		let producto = [...selectedProduct]
		producto[index].detalle[key] = ev.target.value
		setSelectedProduct(producto)
	}
	return (
		<React.Fragment>
			<Steps steps={steps} />
			{steps[0].completed && (
				<Card
					style={{ marginBottom: ".5em", fontSize: ".6rem", padding: "0" }}
					title={selectedClient.razon_social}
					subtitle={selectedClient.rut}
					content={selectedClient.ubicacion}
				/>
			)}
			{(steps[1].active || steps[1].completed) && (
				selectedProduct.map((producto, index) => (

					// <Card

					// 	style={{ marginBottom: ".5em", fontSize: ".6rem", padding: "0" }}
					// 	title={<>{producto.shortDescription} <a onClick={() => removeSelectedProduct(index)} className="button is-danger is-pulled-right">Eliminar</a><span className="title is-7 mt-3 is-block" >Cantidad: <input style={{ width: "2rem" }} className="input is-small" /></span>  </>}
					// 	subtitle={producto.partnumber}
					// 	content={<>
					// 		{Object.entries(producto.detalle).map(([key, _], idx) => {
					// 			{ console.log(Object.entries(producto.detalle)) }
					// 			if (key !== "CPU") return <p key={idx}>{key}: <input onChange={handleInput(index, key)} value={selectedProduct[index].detalle[key]} /></p>
					// 		})}
					// 	</>}
					// />
					<ProductCard
						key={index}
						producto={producto}
						handleInput={handleInput(index)}
						removeSelectedProduct={() => removeSelectedProduct(index)}
					/>
				))
			)}
			{steps[0].active && <ClientSelector setSelected={selectClient} />}
			{steps[1].active && <ProductSelector setSelected={selectProduct} handleClick={() => nextStep()} />}
		</React.Fragment>
	);
};


export default JobInit;
