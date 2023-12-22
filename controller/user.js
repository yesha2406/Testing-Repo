const User = require('../schemas/user');

const UserController = {};
const statusCode = _CONSTANT.statusCode;

const getAllUsers = async (req, res) => {
  try {
    let filter = {};

    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { status: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    let sortObj = {};
    if (req.query.sortBy) {
      if (req.query.sort) {
        sortObj[req.query.sortBy] = parseInt(req.query.sort);
      } else {
        sortObj[req.query.sortBy] = -1;
      }
    } else {
      sortObj = {
        createdAt: -1,
      };
    }

    let limit = 10;
    let page = 1;
    let skip;
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    if (req.query.page) {
      let convertPage = parseInt(req.query.page);
      skip = (convertPage - 1) * limit;
    } else {
      skip = (page - 1) * limit;
    }
    let users = await User.find(filter).sort(sortObj).skip(skip).limit(limit);
    console.log('getAllUsers Controller DATA :::  ::: ', users);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.GET_USER_DATA,
      statusCode.SUCCESS,
      users
    );
  } catch (err) {
    console.log('Error in getAllUsers Controller CATCH :::  ::: ', err.message);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

const getUserDataByPk = async (req, res) => {
  try {
    let id = req.params.id;

    let user = await User.findById({ _id: id }).lean();
    if (!user) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.NO_DATA_FOUND,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    console.log('getUserDataByPk Controller DATA :::  ::: ', user);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.GET_USER_DATA,
      statusCode.SUCCESS,
      user
    );
  } catch (err) {
    console.log(
      'Error in getUserDataByPk Controller CATCH :::  ::: ',
      err.message
    );
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

UserController.getAllUsers = getAllUsers;
UserController.getUserDataByPk = getUserDataByPk;

module.exports = UserController;
