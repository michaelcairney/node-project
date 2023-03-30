const adModel = require('../models/adModel');
const { success } = require('../utils/apiResponse');

const getAllAds = async (req, res) => {
  try {
    // query all ads
    const ads = await adModel.find();

    // send response
    success(res, 200, ads);
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const getUserAds = async (req, res) => {
  try {
    // query all ads
    const userId = req.params.userId;
    const userAds = await adModel.find({ userId });

    // send response
    success(res, 200, userAds);
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const getAd = async (req, res) => {
  try {
    // query single ad
    const id = req.params.id;
    console.log(id);
    const ad = await adModel.findById(id);

    // send response
    success(res, 200, ad);
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const createAd = async (req, res) => {
  try {
    // create new document using info from request body,
    // apply to the adModel model and store in newAd variable
    const newAd = await adModel.create(req.body);
    const user = await // send response
    success(res, 200, newAd);
  } catch (error) {
    // send error
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const updateAd = async (req, res) => {
  try {
    // update document
    const ad = await adModel.findByIdAndUpdate(req.params.id, req.body, {
      // This option sends the new updated document rather than the original
      new: true,

      // This option applies the validations made in the adModel to the updated document
      runValidators: true,
    });

    // send response
    success(res, 200, ad);
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const deleteAd = async (req, res) => {
  try {
    // apply delete document method
    await adModel.findByIdAndDelete(req.params.id);

    // send response
    success(res, 204, null);
  } catch (error) {
    // send error
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = { getAllAds, getUserAds, getAd, createAd, updateAd, deleteAd };
