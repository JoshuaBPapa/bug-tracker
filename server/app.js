const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors({
  exposedHeaders: ['x-access-token', 'x-refresh-token', 'x-userid']
}));

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(authRoutes);
app.use(auth.checkUserToken);
app.use(auth.checkAuthLevel);
app.use(projectRoutes);
app.use(ticketRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  let message = err.message;

  if (status === 500) {
    message = 'There was an error with the server. Please try again later.';
  }

  res.status(status).json({ message: message });
});

app.listen(process.env.SERVER_PORT);