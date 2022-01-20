import Sequelize from "sequelize";
import { sequelize } from "../sequelize";

const Cliente = sequelize.define(
	"cliente",
	{
		rut: {
			type: Sequelize.TEXT,
			primaryKey: true,
		},
		razonsocial: {
			type: Sequelize.TEXT,
		},
		ubicacion: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		telefonocontacto: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		personacontacto: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		cargo: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		createdat: {
			type: Sequelize.DATEONLY,
			defaultValue: Sequelize.NOW,
		},
	},
	{
		timestamps: true,
		updatedAt: "updatedat",
		tableName: "clientes",
	}
);

// Cliente.sync({ force: true }).then(console.log('modelo Cliente actualizado'));

export default Cliente;
