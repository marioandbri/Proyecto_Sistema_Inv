const onlyDate = (stringDatetime) => {
	if (!stringDatetime) {
		return null;
	}
	return stringDatetime.substring(0, stringDatetime.indexOf("T"));
};

export const columns = [
	{
		Header: "Numero de Serie",

		accessor: "numeroSerie", // accessor is the "key" in the data

		aggregate: "count",
		Aggregated: ({ value }) => `${value} elementos`,
	},
	{
		Header: "Tipo Producto",
		accessor: "producto.tipoProducto",
		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} tipo de productos`,
	},
	{
		Header: "Part N°",

		accessor: "productPN",

		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} Numeros de Parte`,
	},
	{
		Header: "Descripción",

		accessor: "producto.shortDescription",
		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Descripciones`
	},
	{
		Header: "Rut Poseedor",

		accessor: "rutPoseedor",

		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} Poseedor Unico`,
	},
	{
		Header: "Poseedor",

		accessor: "poseedor.razon_social",

		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Poseedor Unicos`
	},
	// {
	// 	Header: "F. Compra",

	// 	accessor: "fechaCompra",
	// 	Cell: ({ value }) => onlyDate(value),
	// },
	// {
	// 	Header: "RUT Proveedor",

	// 	accessor: "rutProveedor",

	// 	aggregate: "uniqueCount",
	// 	Aggregated: ({ value }) => `${value} Rut Proveedor Unicos`,
	// },
	// {
	// 	Header: "Proveedor",

	// 	accessor: "proveedor.razon_social",

	// 	// aggregate: 'uniqueCount',
	// 	// Aggregated: ({ value }) => `${value} Proveedor Unicos`
	// },
	// {
	// 	Header: "Factura Nro",

	// 	accessor: "nroFactura",

	// 	aggregate: "uniqueCount",
	// 	Aggregated: ({ value }) => `${value} Facturas Unicas`,
	// },
	{
		Header: "Estado",

		accessor: "estado",

		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Facturas Unicas`
	},
	{
		Header: "F. Evento",

		accessor: "fechaEvento",

		Cell: ({ value }) => onlyDate(value),

		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Fechas Unicas`
	},
	{
		Header: "Guia",

		accessor: "nroGuia",

		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} guias únicas`,
	},
];

export const columnsAdv = [
	{
		Header: "Numero de Serie",

		accessor: "numeroSerie", // accessor is the "key" in the data

		aggregate: "count",
		Aggregated: ({ value }) => `${value} elementos`,
	},
	{
		Header: "Tipo Producto",
		accessor: "producto.tipoProducto",
		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} tipo de productos`,
	},
	{
		Header: "Part N°",

		accessor: "productPN",

		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} Numeros de Parte`,
	},
	{
		Header: "Descripción",

		accessor: "producto.shortDescription",
		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Descripciones`
	},
	{
		Header: "Rut Poseedor",

		accessor: "rutPoseedor",

		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} Poseedor Unico`,
	},
	{
		Header: "Poseedor",

		accessor: "poseedor.razon_social",

		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Poseedor Unicos`
	},
	{
		Header: "F. Compra",

		accessor: "fechaCompra",
		Cell: ({ value }) => onlyDate(value),
	},
	{
		Header: "RUT Proveedor",

		accessor: "rutProveedor",

		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} Rut Proveedor Unicos`,
	},
	{
		Header: "Proveedor",

		accessor: "proveedor.razon_social",

		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Proveedor Unicos`
	},
	{
		Header: "Factura Nro",

		accessor: "nroFactura",

		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} Facturas Unicas`,
	},
	{
		Header: "Estado",

		accessor: "estado",

		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Facturas Unicas`
	},
	{
		Header: "F. Evento",

		accessor: "fechaEvento",

		Cell: ({ value }) => onlyDate(value),

		// aggregate: 'uniqueCount',
		// Aggregated: ({ value }) => `${value} Fechas Unicas`
	},
	{
		Header: "Guia",

		accessor: "nroGuia",

		aggregate: "uniqueCount",
		Aggregated: ({ value }) => `${value} guias únicas`,
	},
];
