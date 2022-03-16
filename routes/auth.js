const router = require('express').Router();
const { register, login, getUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', register);
router.post('/login', login);
router.get('/', verifyToken, getUser);

module.exports = router;