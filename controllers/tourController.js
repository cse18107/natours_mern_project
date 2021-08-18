const fs=require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);


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
  exports.deleteTour = (req, res) => {
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
