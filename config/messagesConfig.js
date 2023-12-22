//  Defined response messages
const messages = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  NO_DATA_FOUND: 'No data found.',
  SOMETHING_WENT_WRONG: 'Something went wrong.',
  BED_REQUEST: 'Bed request',

  // Auth messages...
  LOGIN_SUCCESS: 'Signin successfully.',
  UNAUTHORIZED: 'Unauthorized',
  INVALID_CREDENTIALS: 'Invalid credentials.',
  USER_SIGNUP_SUCCESS: 'User signup successfully.',
  ERROR_USER_SIGNUP: 'Error in user signup.',
  EMAIL_EXISTED: 'Email already exists.',
  USER_NOT_FOUND: 'User not found.',

  // Project messages...
  PROJECT_EXISTED: 'Project already existed.',
  PROJECT_ADD: 'New project added successfully.',
  GET_PROJECT_DATA: 'Projects data.',
  PROJECT_UPDATE: 'Project details update successfully.',
  PROJECT_DELETE: 'Project deleted successfully.',

  // Task messages...
  TASK_EXISTED: 'Project already existed.',
  TASK_ADD: 'New task added successfully.',
  GET_TASK_DATA: 'Task data.',
  TASK_UPDATE: 'Task details update successfully.',
  TASK_DELETE: 'Task deleted successfully.',

  // User messages...
  USER_EXISTED: 'User already existed.',
  USER_ADD: 'New user added successfully.',
  GET_USER_DATA: 'Users data.',
  USER_UPDATE: 'User details update successfully.',
  USER_DELETE: 'User deleted successfully.',
};

module.exports = messages;
