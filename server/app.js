const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const projectRoutes = require('./routes/projects');
const sequelize = require('./database/database');

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(projectRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

sequelize.sync()
.then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log('Started okay')
  });
})
.catch(err => {
  console.log(err);
});