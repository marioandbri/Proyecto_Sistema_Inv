import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
/**
 * @typedef {swaggerJSDoc.Options} SwaggerOptions
 */

/**
 * @type {SwaggerOptions}
 */
export const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API Sistema de Inventario",
			version: "1.0",
			description:
				"Documentacion para los EndPoints de los distintos modulos del sistema de inventario.",
		},
		servers: [
			{
				url: "http://localhost:4000",
				description: "Development Server",
			},
		],
	},
	apis: [`${path.join(__dirname, "./routes/*.routes.js")}`],
};
