
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '1M8GDM9A_KP042788', make: 'Nissan', model: 'Sentra', mileage: 1000},
        {VIN: '1X7UYM1B_LM235781', make: 'Tesla', model: 'Model S', mileage: 0},
      ]);
    });
};
