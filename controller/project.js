const Project = require('../schemas/project');

const ProjectController = {};
const statusCode = _CONSTANT.statusCode;

const createProject = async (req, res) => {
  try {
    let body = req.body;
    let projectExistByName = await Project.findOne({ name: body.name }).lean();
    if (projectExistByName !== null) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.PROJECT_EXISTED,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    let newProject = (await Project.create(body)).toObject();
    console.log('createProject Controller DATA :::  ::: ', newProject);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.PROJECT_ADD,
      statusCode.SUCCESS,
      newProject
    );
  } catch (err) {
    console.log('Error in createProject Controller CATCH :::  ::: ', err);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};

const getAllProjects = async (req, res) => {
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
    let projects = await Project.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);
    console.log('getAllProjects Controller DATA :::  ::: ', projects);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.GET_PROJECT_DATA,
      statusCode.SUCCESS,
      projects
    );
  } catch (err) {
    console.log(
      'Error in getAllProjects Controller CATCH :::  ::: ',
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

const getProjectDataByPk = async (req, res) => {
  try {
    let id = req.params.id;

    let project = await Project.findById({ _id: id }).lean();
    if (!project) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.NO_DATA_FOUND,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    console.log('getProjectDataByPk Controller DATA :::  ::: ', project);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.GET_PROJECT_DATA,
      statusCode.SUCCESS,
      project
    );
  } catch (err) {
    console.log(
      'Error in getProjectDataByPk Controller CATCH :::  ::: ',
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

const updateProject = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;

    let project = await Project.findById(id).lean();
    if (!project) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.NO_DATA_FOUND,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    let updateProject = await Project.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!updateProject) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.SOMETHING_WENT_WRONG,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    console.log('updateProject Controller DATA :::  ::: ', updateProject);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.PROJECT_UPDATE,
      statusCode.SUCCESS,
      updateProject
    );
  } catch (err) {
    console.log(
      'Error in updateProject Controller CATCH :::  ::: ',
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

const deleteProject = async (req, res) => {
  try {
    let id = req.params.id;

    let project = await Project.findById(id).lean();
    if (!project) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.NO_DATA_FOUND,
        statusCode.BAD_REQUEST,
        {}
      );
    }

    let deleteProject = await Project.findByIdAndDelete({ _id: id }).lean();
    if (!deleteProject) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.SOMETHING_WENT_WRONG,
        statusCode.BAD_REQUEST,
        {}
      );
    }
    console.log(deleteProject);
    console.log('deleteProject Controller DATA :::  ::: ', deleteProject);
    return _RESPONSE.sendSuccessResponse(
      res,
      _MESSAGES.PROJECT_DELETE,
      statusCode.SUCCESS,
      deleteProject
    );
  } catch (err) {
    console.log(
      'Error in deleteProject Controller CATCH :::  ::: ',
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

ProjectController.createProject = createProject;
ProjectController.getAllProjects = getAllProjects;
ProjectController.getProjectDataByPk = getProjectDataByPk;
ProjectController.updateProject = updateProject;
ProjectController.deleteProject = deleteProject;

module.exports = ProjectController;
