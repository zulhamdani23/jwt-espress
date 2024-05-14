const Sequelize = require('sequelize');
const db = require('../../config/database');
let user = {};

user = db.define('user', 
	{
		id: {
			autoIncrement: true,
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true
			},
		username: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}	
	},
	{
		tableName: 'td_user',
		schema: 'public',
		timestamps: false,
		indexes: [
			{
			  name: "td_user_pk",
			  unique: true,
			  fields: [
				{ name: "id" },
			  ]
			},
		  ]
	});

module.exports = user;


