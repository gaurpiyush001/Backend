const express = require('express');
const morgan = require('morgan'); //Is a popular Logging Middleware, which will aalow us to see
//request data info right in the console

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
//below Code is to use morgan middleware only when we are in development 
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //to access the body property of req object by using middleware
//below Middleware is used to serve STATIC FILES from our file system
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  const newLocal = console.log;
  newLocal('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  //when a particular req is hitting the server
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter); //here we are Mounting the route on some other route
app.use('/api/v1/users', userRouter);

module.exports = app;
