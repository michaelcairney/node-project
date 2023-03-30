const express = require('express');
const router = express.Router();
const { verify } = require('../controllers/authController');
const {
  getAllAds,
  getUserAds,
  getAd,
  createAd,
  updateAd,
  deleteAd,
} = require('../controllers/adsController');

// All ads
router.route('/').get(getAllAds).post(createAd);

// Ad by user
router.get('/:userId', getUserAds);

// Ad by id
router.route('/:id').get(getAd).patch(verify, updateAd).delete(verify, deleteAd);

module.exports = router;
