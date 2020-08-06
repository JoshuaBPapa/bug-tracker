const express = require('express');

const projectRoutes = require('./routes/projects');
const sequelize = require('./database/database');

const app = express();

app.use(projectRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

sequelize.authenticate()
.then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log('Test okay')
  });
})
.catch(err => {
  console.log(err);
});