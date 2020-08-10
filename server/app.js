const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const projectRoutes = require('./routes/projects');
const ticketRoutes = require('./routes/tickets');
const sequelize = require('./database/database');
const defineAssociations = require('./database/associations');

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(projectRoutes);
app.use(ticketRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

defineAssociations();

sequelize.sync()
.then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log('Started okay')
  });
})
.catch(err => {
  console.log(err);
});