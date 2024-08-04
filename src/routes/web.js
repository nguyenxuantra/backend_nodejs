const express = require('express');
const { getHomepage,getCreateUsers,postCreatUser } = require('../controllers/homeControllers');

const router = express.Router();


router.get('/',getHomepage)

router.get('/createUser',getCreateUsers)

router.post('/create-user',postCreatUser )

module.exports = router;