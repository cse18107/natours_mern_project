const Tour=require('./../models/tourModel');


exports.checkoutBody=(req,res,next)=>{
  if(!req.body.name||!req.body.duration){
    return res.status(404).json({
      status:'Not valid',
      message:'Name and duration should be in the data'
    });
  }
  next();
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    // data: {
    //   tours,
    // },
  });
};
exports.getTour = (req, res) => {
  // const tour = tours.find(ele=>(ele.id===req.params.id*1));
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: tour,
  //   },
  // });
};
exports.postTour = (req, res) => {
  console.log(req.body);
  // const tour = Object.assign({ id: tours.length }, req.body);
  // tours.push(tour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     console.log('something wrong happens');
  //   }
  // );
  // res.send('done');
};
exports.patchTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: tour,
    // },
  });
};
exports.deleteTour = (req, res) => {
  res.status(202).json({
    status: 'success',
  });
};
