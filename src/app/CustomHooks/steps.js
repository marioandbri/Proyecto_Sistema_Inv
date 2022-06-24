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
	let initializedSteps = stepsObject.map(
		({ title, description, color, icon }, index) => {
			let stepUnit = {
				...step,
				icon: icon ?? step.icon,
				title,
				description,
				color,
			};
			if (index === 0) {
				stepUnit.active = true;
			}
			return stepUnit;
		}
	);

	const [steps, setSteps] = useState(initializedSteps);

	const nextStep = () => {
		let index = steps.findIndex((e) => e.active);
		if (index < 0) {
			return;
		}
		setSteps((oldSteps) => {
			const newSteps = [...oldSteps];

			newSteps[index].completed = true;
			newSteps[index].active = false;
			newSteps[index].icon = (
				<>
					<CheckIcon />
				</>
			);
			if (!newSteps[index + 1]) {
				return newSteps;
			}
			newSteps[index + 1].active = true;
			return newSteps;
		});
	};

	const previousStep = () => {
		let index = steps.findIndex((e) => e.active);
		if (index < 0) {
			return;
		}
		setSteps((oldSteps) => {
			const newSteps = [...oldSteps];

			newSteps[index].active = false;
			newSteps[index].completed = false;
			newSteps[index].icon = stepsObject[index].icon;
			newSteps[index - 1].icon = stepsObject[index - 1].icon;
			newSteps[index - 1].active = true;
			newSteps[index - 1].completed = false;

			return newSteps;
		});
	};

	return { steps: steps, previousStep, nextStep };
};
