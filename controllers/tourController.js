const Tour = require('./../models/tourModel');
/*
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
*/

/*Core Concept of middlewares can be seen by below function function
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};
*/

/*Commenting this because now Our mongoose model will take care for that
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};*/

exports.getAllTours = async (req, res) => {
  try {
  console.log(req.requestTime);

  const queryObj = {...req.query};
  const excludedFields = ['sort', 'fields', 'limit', 'page'];
  excludedFields.forEach(element => delete queryObj[element]);
  
  console.log(req.query, queryObj);
  //below find method will return an query

  //BUILDING THE QUERY
  const query = Tour.find(queryObj);//this will return an array of documents, and also convert them into JSObjects
  
  //executing the query in below line
  const tours = await query;
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
  } catch(err) {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
};

exports.getTour = async (req, res) => {
  try {
    //Tour.findOne({ _id : req.params.id });
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
  // console.log(req.params);
  // const id = req.params.id * 1;

  // const tour = tours.find(el => el.id === id);


};

exports.createTour = async (req, res) => {
  // console.log(req.body);
  try {
//we call create method on Model itself, it will also give result with proper id and save it to database
  const newTour  = await Tour.create(req.body);
  console.log(newTour);

  res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
  });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }

};

exports.updateTour = async (req, res) => {
  try{

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,/*this ensures new updated document is returned*/
      runValidators: true
    })

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
  } catch (err) {
      res.status(404).json({
    status: 'fail',
    message: err
  });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    //In restFull API, its kind of standard to not send any data on Delete and thus 204 status code
    await Tour.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
      status: 'success',
      data: null
    });

  } catch(err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
  }
};
