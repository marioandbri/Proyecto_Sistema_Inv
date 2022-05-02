import { Properties } from "csstype";
import { Request } from "express";
import React, {
	ChangeEvent,
	ChangeEventHandler,
	ReactNode,
	SetStateAction,
} from "react";
import { string } from "yup";

export type ExpressRouterRequest = Request<
	{},
	any,
	any,
	qs.ParsedQs,
	Record<string, any>
> & {
	params: { [key: string]: any };
};

export type ExpressRouterFunction = (
	req: ExpressRouterRequest,
	res: any
) => Promise<void>;

export interface UserModel {
	username: string;
	email: string;
	hash: string;
	salt: string;
	isAdmin?: boolean;
	accessEmpresas: boolean[];
	accessProductos: boolean[];
	accessInventarios: boolean[];
}

export interface EmpresaModel {
	rut: string;
	razon_social: string;
	ubicacion: string;
	telefono_contacto: number;
	cargo: string;
}

export type TipoProductoFields = {
	titulo: string;
	tipo: "text" | "number";
};
export interface TipoProductoModel {
	option: string;
	form: TipoProductoFields[];
}

export interface ProductoModel {
	tipoProducto: TipoProductoModel["option"];
	partnumber: string;
	marca: string;
	modelo: string;
	familia: string;
	detalle: string;
	shortDescription: string;
	extraDescription: string;
	shortDescriptionTags: string;
}

export interface InventarioModel {
	numeroSerie: string;
	productPn: ProductoModel["partnumber"];
	rutPoseedor: EmpresaModel["rut"];
	rutProveedor: EmpresaModel["rut"];
	fechaCompra: Date;
	fechaEvento: Date;
	nroFactura: string;
	estado: string;
	nroGuia: number;
}
declare type TipoMovimiento = "ENTREGA" | "RETIRO" | "CAMBIO";
declare type EstadoMovimiento =
	| "Pendiente"
	| "En Preparacion"
	| "En Procesamiento"
	| "Finalizado";

export type PedidoMovimiento = {
	numeroSerie: InventarioModel["numeroSerie"];
	partnumber: ProductoModel["partnumber"];
	orientacion: "entrega" | "retiro";
	modificaciones: any;
};

export interface MovimientoModel {
	rut: EmpresaModel["rut"];
	tipo: TipoMovimiento;
	guia: string;
	estado: EstadoMovimiento;
	pedido: PedidoMovimiento[];
	fechaMovimiento: Date;
	actualizaciones: string;
	fechaCreacion: Date;
	tecnico: string;
}

export type ListComponentProps = React.PropsWithChildren<
	React.HTMLAttributes<HTMLDivElement>
>;

export type ListItemProps = {
	title: string | React.ReactElement;
	button1?: (React.ReactNode & HTMLButtonElement) | React.ReactElement;
	button2?: (React.ReactNode & HTMLButtonElement) | React.ReactElement;
	description: string | React.ReactElement;
	itemIcon?: React.ReactElement;
};

export type CardComponentProps = {
	title: ReactNode;
	subtitle: ReactNode;
	content: ReactNode;
	style?: Properties;
};

export type PanelComponentProps<T> = {
	title: ReactNode;
	id?: string;
	listIcon?: ReactNode;
	data: Array<T>;
	mapCallback: (item: T, index: number) => ReactNode;
	query: string;
	setQuery: () => ChangeEventHandler<HTMLInputElement>;
	className?: string;
};

export type DataPanelSelectorProps = {
	urlToFetch: string;
	title: ReactNode;
	mapCallback: (item: any, index: number) => ReactNode;
};

export type SelectComponentProps = {
	id: string;
	style?: Properties;
	className?: string;
	value: string;
	handleChange: () => ChangeEventHandler<HTMLSelectElement>;
	options: Array<string | number>;
};

export interface Step {
	active: boolean;
	completed: boolean;
	color?: "is-success" | "is-danger" | "is-info" | "is-warning" | "is-primary";
	icon: ReactNode;
	title: string;
	description: string;
}

export type StepsComponentProps = {
	steps: Step[];
};
