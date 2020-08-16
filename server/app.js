const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const projectRoutes = require('./routes/projects');
const ticketRoutes = require('./routes/tickets');

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(projectRoutes);
app.use(ticketRoutes);

app.listen(process.env.SERVER_PORT);