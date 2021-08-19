const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'Not found',
      message: 'tour Not found',
    });
  }
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
exports.postTour = (req, res) => {
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
exports.patchTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(202).json({
    status: 'success',
  });
};
