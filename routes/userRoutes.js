const express=require('express');
const userController=require('./../controllers/userController');
const router=express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.postUser);
router
    .route('/:_id')
    .get(userController.getUser)
    .patch(userController.patchUser)
    .delete(userController.deleteUser);

module.exports=router;
  