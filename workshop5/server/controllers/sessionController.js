const crypto = require('crypto');
const Session = require("../models/sessionModel");

const saveSession = async function (username) {
  const token = crypto.createHash('md5').update(username).digest("hex");
  // insert token to the session table
  const session = new Session();
  const expirationTime = new Date();
  expirationTime.setTime(expirationTime.getTime() + 15 * 60 * 1000); // se suma el total de milisegundos equivalentes a 15 minutos
  session.token = token;
  session.user = username;
  session.expire = expirationTime;
  return session.save();
};

const getSession = function (token) {
  return Session.findOne({ token });
};

module.exports = {
  saveSession,
  getSession
}