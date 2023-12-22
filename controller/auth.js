const User = require('../schemas/user');
const AuthValidator = require('../validators/auth');

const AuthController = {};
const statusCode = _CONSTANT.statusCode;

const signup = async (req, res) => {
  try {
    let body = req.body;
    await AuthValidator.signupValidator(body);
    // console.log('>>>>>>>', body);
    let userExistByEmail = await User.findOne({ email: body.email }).lean();
    if (userExistByEmail !== null) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.EMAIL_EXISTED,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    var hashPassword = await _UTIL.hashPassword(body.password);

    let userObj = {
      ...body,
      password: hashPassword,
    };

    let newUser = (await User.create(userObj)).toObject();
    delete newUser.password;
    console.log('signup Controller DATA :::  ::: ', newUser);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.USER_SIGNUP_SUCCESS,
      statusCode.SUCCESS,
      newUser
    );
  } catch (err) {
    console.log('Error in signup Controller CATCH :::  ::: ', err);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

const signin = async (req, res) => {
  try {
    let body = req.body;
    await AuthValidator.signinValidator(body);

    let userExistByEmail = await User.findOne({ email: body.email }).lean();
    if (userExistByEmail == null) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.USER_NOT_FOUND,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    let checkPassword = await _UTIL.comparePassword(
      body.password,
      userExistByEmail.password
    );
    if (checkPassword == false) {
      throw new Error(_MESSAGES.INVALID_CREDENTIALS);
    }

    let token = await _UTIL.generateJwt(userExistByEmail);

    delete userExistByEmail.password;
    console.log('signin Controller DATA :::  ::: ', userExistByEmail);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.LOGIN_SUCCESS,
      statusCode.SUCCESS,
      { ...userExistByEmail, token }
    );
  } catch (err) {
    console.log('Error in signin Controller CATCH :::  ::: ', err.message);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

AuthController.signup = signup;
AuthController.signin = signin;

module.exports = AuthController;
