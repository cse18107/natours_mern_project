const express=require('express');
const app=express();
const fs=require('fs');


const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8')
);


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


const router=express.Router();

router
    .route('/')
    .get(getAllUsers)
    .post(postUser);
router
    .route('/:_id')
    .get(getUser)
    .patch(patchUser)
    .delete(deleteUser);

module.exports=router;
  