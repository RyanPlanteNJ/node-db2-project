const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req,res) => {
  db('cars')
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed to retrieve car information'
      });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cars').where({ id }).first()
  .then(cars => {
    res.json(cars);
  })
  .catch(err=>{
    res.status(500).json({ message: 'Failed to obtain car information'});
  });
});

router.post('/', (req, res) => {
  const carData = req.body;
  db('cars').insert(carData)
    .then(ids => {
      db('cars').where({ id: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log('POST error', err);
      res.status(500).json({ message: 'Failed to add car information to database'});
    });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('cars').where({ id }).update(changes)
  .then(count => {
    if(count) {
      res.status(200).json({ update: count });
    } else {
      res.status(404).json({ message: 'There is no car that matches that ID' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Unable to update car information'});
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteCar = await db.del().from('cars').where( {id })
    if(deleteCar) {
      res.status(200).json({deleted: deleteCar});
    } else {
      res.status(404).json({ message: 'There is no car that matches that ID' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Unable to delete car information '});
  }
});


module.exports = router;
