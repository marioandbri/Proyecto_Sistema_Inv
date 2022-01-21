import React, { useEffect, useRef, useState } from "react";
import ProductTypeList from "./ProductTypeList";
import ProductTypeItem from "./ProductTypeItem";
import { useFetch } from "../useFetch";
import LoadingBar from "../LoadingBar";
import { ToastNotification } from "../AppReducer";
import { notificationTypes } from "../Notification";
const index = () => {
	let { data, loading } = useFetch("/producto/types");
	const [typos, setTypos] = useState([]);
	let renderKey = useRef(new Date().toString());
	const deleteTypo = async (id, nombre) => {
		let confirmation = confirm(
			"Seguro desea eliminar el tipo: " + nombre + "?"
		);
		if (confirmation) {
			const result = await fetch("producto/types/" + id, {
				method: "DELETE",
			});
			const json = await result.json();
			console.log(json);
			if (result.ok) {
				setTypos((data) => {
					return data.filter((e) => e._id !== id);
				});
				ToastNotification(
					notificationTypes.success,
					"Se ha eliminado correctamente"
				);
				return;
			} else {
				ToastNotification(
					notificationTypes.danger,
					"ha ocurrido un error, actualiza la pagina"
				);
			}
		} else {
			ToastNotification(notificationTypes.warning, "Se canceló la operación");
		}
	};
	useEffect(() => {
		setTypos(data);

		return () => {
			setTypos([]);
		};
	}, [loading]);
	const productDetails = data.map((e) => e.form.map((e) => e.titulo));
	console.log(productDetails);
	if (!loading)
		return (
			<>
				<div className="box">
					<ProductTypeList>
						{typos.map((e, index) => (
							<ProductTypeItem
								key={index}
								titulo={e.option}
								description={productDetails[index].toString()}
								id={e._id}
								deleteTypo={deleteTypo}
							/>
						))}
					</ProductTypeList>
				</div>
			</>
		);

	return (
		<div className="box">
			<LoadingBar />
		</div>
	);
};

export default index;
