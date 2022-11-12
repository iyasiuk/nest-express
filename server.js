/** @format */
const express = require('express');
const helmet = require('helmet');
const chalk = require('chalk');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { errorLogger, errorResponder, invalidPathHandler } = require('./app/middlewares/errorMiddleware');
const createPath = require('./app/helpers/create-path');
const authRoutes = require('./app/routes/api-auth-routes');
const accountRoutes = require('./app/routes/api-account-routes');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;
// .env file configuration
if (process.env.NODE_ENV === 'development') {
  require('./config/env').get()
}

// Express initialization
const app = express();
app.set('view engine', 'ejs');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// CORS initialization
// app.use(cors());

// Helmet initialization
app.use(helmet());

// Body parser middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use(authRoutes);
app.use(accountRoutes);

app.get('/error', (req, res) => {
  const title = 'Error Page';
  res
  .status(404)
  .render(createPath('error'), { title });
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handler errors
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

app.listen(process.env.PORT || 8000, err => {
  if (err) {
    console.error(err);
  }
  console.log(`app running on port:${process.env.PORT || 8000}`);
});