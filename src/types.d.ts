import express, { Request } from "express";
import { string } from "yup";

export type ExpressRouterRequest = Request<
	{},
	any,
	any,
	QueryString.ParsedQs,
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
	isAdmin?: string;
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
	tipo: ["text", "number"];
};
export interface TipoProductoModel {
	option: string;
	form: TipoProductoFields[];
}

export interface ProductoModel {
	tipoProducto: Pick<TipoProductoModel, "option">;
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
	productPn: Pick<ProductoModel, "partnumber">;
	rutPoseedor: Pick<EmpresaModel, "rut">;
	rutProveedor: Pick<EmpresaModel, "rut">;
	fechaCompra: Date;
	fechaEvento: Date;
	nroFactura: string;
	estado: string;
	nroGuia: number;
}
enum TipoMovimiento {
	ENTREGA = "ENTREGA",
	RETIRO = "RETIRO",
	CAMBIO = "CAMBIO",
}
enum EstadoMovimiento {
	Pendiente = "Pendiente",
	Preparacion = "En Preparacion",
	Procesamiento = "En Procesamiento",
	Finalizado = "Finalizado",
}

export type PedidoMovimiento = {
	numeroSerie: Pick<InventarioModel, "numeroSerie">;
	partnumber: Pick<ProductoModel, "partnumber">;
	orientacion: "entrega" | "retiro";
	modificaciones: any;
};

export interface MovimientoModel {
	rut: Pick<EmpresaModel, "rut">;
	tipo: tipoMovimiento;
	guia: string;
	estado: EstadoMovimiento;
	pedido: PedidoMovimiento[];
	fechaMovimiento: Date;
	actualizaciones: string;
	fechaCreacion: Date;
	tecnico: string;
}
