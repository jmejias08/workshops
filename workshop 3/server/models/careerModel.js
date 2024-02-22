const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const career = new Schema({
  name: { type: String },
  id_code: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Career', career);