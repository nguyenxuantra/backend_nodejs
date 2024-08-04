const express = require('express');
const { getHomepage,getCreateUsers,postCreatUser,login, authenToken } = require('../controllers/homeControllers');

const router = express.Router();


router.get('/',getHomepage)

router.get('/createUser',getCreateUsers)

router.post('/create-user',postCreatUser )

router.post('/login', authenToken,login)
module.exports = router;