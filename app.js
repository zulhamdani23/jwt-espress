require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT

app.use(express.json());
app.listen(port, () => console.log(`Running di port ${port}`));
app.use('/api', require('./src/routes/route'));

module.exports = app;