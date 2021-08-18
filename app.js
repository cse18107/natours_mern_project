const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

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

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, 'utf-8')
);

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'not valid',
      message: 'tour not found',
    });
  }
};
const postTour = (req, res) => {
  console.log(req.body);
  const tour = Object.assign({ id: tours.length }, req.body);
  tours.push(tour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log('something wrong happens');
    }
  );
  res.send('done');
};
const patchTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);
  if (tour) {
    res.status(201).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } else {
    res.json({
      message: 'URL not currect',
    });
  }
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (tour) {
    res.status(202).json({
      status: 'success',
      message: 'data is deleted',
    });
  } else {
    res.status(404).json({
      status: 'unsuccess',
      message: 'data is not found',
    });
  }
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users: users,
    },
  });
};
const getUser = (req, res) => {
  console.log(req.params._id);
  const id = req.params._id;
  const user = users.find((ele) => ele._id === id);
  console.log(user);
  if (user) {
    res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } else {
    res.status(404).json({
      status: 'faild',
      message: "Can't find user",
    });
  }
};
const postUser = (req, res) => {
  const length = users.length;
  console.log(req.body);
  const user = req.body;
  const newUser = Object.assign({ _id: length + 1 }, user);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.send('new user not assigned');
      return;
    }
  );
  res.status(200).json({
    status: 'data inserted',
    data: {
      new_user: newUser,
    },
  });
};
const patchUser = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const user = users.find((ele) => ele.id === id);
  if (user) {
    res.status(201).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } else {
    res.json({
      message: 'URL not currect',
    });
  }
};
const deleteUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el.id === id);
  if (user) {
    res.status(202).json({
      status: 'success',
      message: 'data is deleted',
    });
  } else {
    res.status(404).json({
      status: 'unsuccess',
      message: 'data is not found',
    });
  }
};


const tourRouter=express.Router();
const userRouter=express.Router();

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

tourRouter.route('/').get(getAllTours).post(postTour);
tourRouter.route('/:id').get(getTour).patch(patchTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(postUser);
userRouter.route('/:_id').get(getUser).patch(patchUser).delete(deleteUser);



app.listen(4000, '127.0.0.1', () => {
  console.log('Listening from port 4000...');
});
