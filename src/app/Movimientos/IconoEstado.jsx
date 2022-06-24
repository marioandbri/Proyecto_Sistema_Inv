import React from "react";
import { useSteps } from "../CustomHooks/steps";
import Steps from "../FormComponents/Steps";

const IconoEstado = ({ estado }) => {

	/**
	 * @type {import("../../types").Step[]}
	 */
	const initialSteps = [
		{
			icon: <i className="fas fa-tools"></i>,
			active: true,
			completed: false,
			description: "",
			title: "Laboratorio",
			color: "is-success"
		},
		{
			icon: <i className="fas fa-chalkboard-teacher"></i>,
			active: false,
			completed: false,
			description: "",
			title: "Operaciones",
			color: "is-success"
		},
		{
			icon: <i className="fas fa-truck-pickup"></i>,
			active: false,
			completed: false,
			description: "",
			title: "Transporte",
			color: "is-success"
		},
	]
	const { nextStep, previousStep, steps } = useSteps(initialSteps)
	console.log(steps)

	return (
		<>
			{/* <button title={estado} style={{ height: "fit-content" }} className="button is-static"> */}
			{/* <span>{estado === "Pendiente" ? "Laboratorio" : estado}</span> */}
			<div className="">
				<Steps steps={steps} />
				<a className="button is-small" onClick={nextStep}>next</a>
				<a className="button is-small" onClick={previousStep}>previous</a>
				{/* <Icon /> */}
			</div>
			{/* </button> */}
		</>
	);

};

export default IconoEstado;
