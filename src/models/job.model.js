const Sequelize = require('sequelize');
const db = require('../../config/database');
let job = {};

job = db.define('job',
	{
		id: {
			autoIncrement: true,
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true
		  },
		job: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false
		},
		location: {
			type: Sequelize.STRING,
			allowNull: false
		},
		full_time: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
		job_detail: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'td_job_master',
		schema: 'public',
		timestamps: false
	}
)


module.exports = job;

