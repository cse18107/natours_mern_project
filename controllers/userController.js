const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


exports.getAllUsers =catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    },
  });
});


exports.getUser = async(req, res) => {
  console.log(req.params._id);
  const users = await User.find();
  const id = req.params._id;
  const user = users.find((ele) => ele.id === id);
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
      status: 'failed',
      message: "Can't find user",
    });
  }
};
exports.postUser =async (req, res) => {
  const users = await User.find();
  const length = users.length;
  console.log(req.body);
  const user = req.body;
  const newUser = Object.assign({ _id: length + 1 }, user);
  User.push(newUser);
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
exports.patchUser = async(req, res) => {
  const users = await User.find();
  console.log(req.params);
  const id = req.params.id;
  const user = users.find((ele) => ele._id === id);
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
exports.deleteUser = async(req, res) => {
  const users = await User.find();
  const id = req.params.id;
  const user =users.find((el) => el.id === id);
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
