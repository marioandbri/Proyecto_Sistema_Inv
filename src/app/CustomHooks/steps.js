import React, { useState } from "react";
import { ClockIcon, CheckIcon } from "../Icons";
/**
 * @typedef {import("../../types").Step} Step
 * @param {Partial<Step>[]} stepsObject
 */
export const useSteps = (stepsObject) => {
	let step = {
		active: false,
		completed: false,
		icon: <ClockIcon />,
		title: "",
		description: "",
	};
	let initializedSteps = stepsObject.map(({ title, description }, index) => {
		let stepUnit = { ...step, title, description };
		if (index === 0) {
			stepUnit.active = true;
		}
		return stepUnit;
	});

	const [steps, setSteps] = useState(initializedSteps);

	const nextStep = () => {
		let index = steps.findIndex((e) => e.active);
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

	const previousStep = () => {
		let index = steps.findIndex((e) => e.active);
		setSteps((oldSteps) => {
			const newSteps = [...oldSteps];
			newSteps[index].active = false;
			newSteps[index].icon = (
				<>
					<ClockIcon />
				</>
			);
			newSteps[index - 1].active = true;
			newSteps[index - 1].completed = false;
			return newSteps;
		});
	};

	return { steps: steps, previousStep, nextStep };
};
