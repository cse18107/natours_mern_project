const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter=require('./routes/tourRoutes')
const userRouter=require('./routes/userRoutes')

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello form the middle ware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


app.listen(4000, '127.0.0.1', () => {
  console.log('Listening from port 4000...');
});
