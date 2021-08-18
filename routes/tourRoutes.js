const express=require('express');
const app=express();
const fs=require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
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


const router=express.Router();

router
    .route('/')
    .get(getAllTours)
    .post(postTour);

router
    .route('/:id')
    .get(getTour)
    .patch(patchTour)
    .delete(deleteTour);

module.exports=router;