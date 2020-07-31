module.exports = {
  validateCars: function (req , res, next) {

//if-then instead of this garbo v

    const CarsInfo = req.body;
    !CarsInfo || CarsInfo === {} ? res.status(400).json({ message: 'Missing Car Info' }) : !CarsInfo.vin || CarsInfo.vin === '' ? res.status(400).json({ message : 'Missing VIN information'}) : !CarsInfo.make || CarsInfo.make === '' ? res.status(400).json({ message: 'Missing Make of Car'}) : !CarsInfo.model || CarsInfo.model === '' ? res.status(400).json({ message: 'Missing Model of Car'}) : !CarsInfo.mileage || CarsInfo.mileate === ''? res.status(400).json({ message: 'Missing mileage of Car' }) : next();
  }
};
