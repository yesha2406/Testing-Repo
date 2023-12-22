const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

let HelperFunctions = {};

// Method for hashing the password
const hashPassword = async (password) => {
  let salt = bcrypt.genSaltSync(10);
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

// Method for comparing the password
const comparePassword = async (password, hashedPassword) => {
  let compare = bcrypt.compareSync(password, hashedPassword);
  return compare;
};

// Method for creating the JWT token
const generateJwt = async (data) => {
  let payload = { id: data._id, email: data.email };
  let token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Method for verifying the JWT token
const verifyJwt = async (token) => {
  let verify = JWT.verify(token, process.env.JWT_SECRET);
  return verify;
};

HelperFunctions.hashPassword = hashPassword;
HelperFunctions.comparePassword = comparePassword;
HelperFunctions.generateJwt = generateJwt;
HelperFunctions.verifyJwt = verifyJwt;

module.exports = HelperFunctions;
