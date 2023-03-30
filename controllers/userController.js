const userModel = require('../models/userModel');
const { success } = require('../utils/apiResponse');

const getAllUsers = async (req, res) => {
  try {
    // query all users
    const users = await userModel.find();

    // send response
    success(res, 200, users);
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = { getAllUsers, deleteUser };
