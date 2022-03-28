import React, { useState } from "react";
import ClientSelector from "./ClientSelector";
import Steps from "../FormComponents/Steps";
import Card from "../FormComponents/Card";
import ProductSelector from "./ProductSelector";

const JobInit = () => {
	const [selectedClient, setSelectedClient] = useState(null);
	const initialSteps = [
		{
			active: true,
			completed: false,
			color: "",
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
			color: "",
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
			color: "",
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
			color: "",
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
	const selectClient = (data) => {
		nextStep(0);
		setSelectedClient(data);
	};
	return (
		<React.Fragment>
			<Steps steps={steps} />
			{steps[0].completed && (
				<Card
					title={selectedClient.razon_social}
					subtitle={selectedClient.rut}
					content={selectedClient.ubicacion}
				/>
			)}
			{steps[0].active && <ClientSelector setSelected={selectClient} />}
			{steps[1].active && <ProductSelector />}
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
