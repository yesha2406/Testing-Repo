const mongoose = require('mongoose');
const Task = require('../schemas/task');

const TaskController = {};
const statusCode = _CONSTANT.statusCode;

const createTask = async (req, res) => {
  try {
    let body = req.body;
    let taskExistByName = await Task.findOne({ name: body.name }).lean();
    if (taskExistByName !== null) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.TASK_EXISTED,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    let newTask = (await Task.create(body)).toObject();
    console.log('createTask Controller DATA :::  ::: ', newTask);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.TASK_ADD,
      statusCode.SUCCESS,
      newTask
    );
  } catch (err) {
    console.log('Error in createTask Controller CATCH :::  ::: ', err);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

const getAllTasks = async (req, res) => {
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
    let tasks = await Task.find(filter).sort(sortObj).skip(skip).limit(limit);
    console.log('getAllTasks Controller DATA :::  ::: ', tasks);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.GET_TASK_DATA,
      statusCode.SUCCESS,
      tasks
    );
  } catch (err) {
    console.log('Error in getAllTasks Controller CATCH :::  ::: ', err.message);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

const getTaskDataByPk = async (req, res) => {
  try {
    let id = req.params.id;

    let task = await Task.findById({ _id: id }).lean();
    if (!task) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.NO_DATA_FOUND,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    console.log('getTaskDataByPk Controller DATA :::  ::: ', task);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.GET_TASK_DATA,
      statusCode.SUCCESS,
      task
    );
  } catch (err) {
    console.log(
      'Error in getTaskDataByPk Controller CATCH :::  ::: ',
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

const updateTask = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;

    let task = await Task.findById(id).lean();
    if (!task) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.NO_DATA_FOUND,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    let updateTask = await Task.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!updateTask) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.SOMETHING_WENT_WRONG,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    console.log('updateTask Controller DATA :::  ::: ', updateTask);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.TASK_UPDATE,
      statusCode.SUCCESS,
      updateTask
    );
  } catch (err) {
    console.log('Error in updateTask Controller CATCH :::  ::: ', err.message);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

const deleteTask = async (req, res) => {
  try {
    let id = req.params.id;

    let task = await Task.findById(id).lean();
    if (!task) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.NO_DATA_FOUND,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    let deleteTask = await Task.findByIdAndDelete({ _id: id }).lean();
    if (!deleteTask) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.SOMETHING_WENT_WRONG,
        statusCode.BAD_REQUEST,
        {}
      );
    }
    console.log(deleteTask);
    console.log('deleteTask Controller DATA :::  ::: ', deleteTask);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.TASK_DELETE,
      statusCode.SUCCESS,
      deleteTask
    );
  } catch (err) {
    console.log('Error in deleteTask Controller CATCH :::  ::: ', err.message);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

const getTaskByProjects = async (req, res) => {
  try {
    let id = req.body.projectId;
    const projectId = mongoose.Types.ObjectId(id);
    let tasks = await Task.aggregate([
      {
        $match: { projectId: projectId },
      },
      {
        $lookup: {
          from: 'projects', // Name of the collection to perform the lookup
          localField: '$projectId', // Field from the tasks collection
          foreignField: '_id', // Field from the projects collection
          as: 'projectTasks', // Alias for the resulting array of tasks with project information
        },
      },
    ]);

    console.log(tasks);

    console.log('getTaskByProjects Controller DATA :::  ::: ', tasks);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.GET_TASK_DATA,
      statusCode.SUCCESS,
      tasks
    );
  } catch (err) {
    console.log(
      'Error in getTaskByProjects Controller CATCH :::  ::: ',
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

TaskController.createTask = createTask;
TaskController.getAllTasks = getAllTasks;
TaskController.getTaskDataByPk = getTaskDataByPk;
TaskController.updateTask = updateTask;
TaskController.deleteTask = deleteTask;
TaskController.getTaskByProjects = getTaskByProjects;

module.exports = TaskController;
