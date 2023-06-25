require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, DB_ADDRESS } = require('./config');

mongoose.connect(DB_ADDRESS);
const app = express();

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
