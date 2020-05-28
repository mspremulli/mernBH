const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

app.use(express.json());
app.use(express.cors());


mongoose
.connect(config.mongoURI, { newUrlParser: true})
.then(() => console.log('connected to db'))
.catch((error) => console.error('failed to connect to db', error));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app is listening on port ${port}`));