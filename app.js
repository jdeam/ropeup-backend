const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;

require('dotenv').config();

app.use(cors({ exposedHeaders: 'Auth' }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const routes = require('./routes');

app.use('/auth', routes.auth);
app.use('/users', routes.users);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.log(err);
  res.status(status).json({ error: err });
});

app.use((req, res, next) => {
  res.status(404).json(
    { error: { message: 'Resource not found.' } }
  );
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
