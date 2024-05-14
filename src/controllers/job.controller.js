const controller = {};
const axios = require('axios').default;

controller.getListJob = async (req, res) => {
	try {
		let page = req.query.page || 1;
		let { description, location, full_time } = req.query
        let paramsDescription = ''
        let paramsLoction = ''
        let paramsType = ''
        let params = ''

        if (description) {
            paramsDescription = `&description=${description}`
        }
        if(location) {
            paramsLoction = `&location=${location}`
        }
        if(full_time) {
            paramsType = `&full_time=${paramsType}`
        }
        params = 'page=' + page + paramsDescription + paramsLoction + paramsType
		let data = null
		let codeStatus = 0
        await axios.get(
            `${process.env.API_JOB}recruitment/positions.json?${params}`

        ).then((res) => {
            if (res) {
                data = res.data
				codeStatus = 200
            }
        }).catch((err) => {
            data = err.response
			codeStatus = 500
        })
		return res.status(codeStatus).json({data})
    } catch (error) {
		return res.status(500).json({message : error.message})
    }
}

controller.getDetailJob = async (req, res) => {
	try {
		let id = req.params.id
		let data = null
		let codeStatus = 0
        
        await axios.get(
            `${process.env.API_JOB}recruitment/positions/${id}`

        ).then((res) => {
            if (res) {
                data = res.data
				codeStatus = 200
            }
        }).catch((err) => {
            data = err.response
			codeStatus = 500
        })

        if (!data.id) {
		    return res.status(201).json({data: 'Not Found'})
        }
		return res.status(codeStatus).json({data})
    } catch (error) {
		return res.status(500).json({message : error.message})
    }
}

module.exports = controller;