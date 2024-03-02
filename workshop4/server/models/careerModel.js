const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modelo con cada atributo de las carreras
const career = new Schema({
  name: { type: String },
  id_code: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Career', career);