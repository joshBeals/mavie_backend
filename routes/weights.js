const router = require('express').Router();
const { addWeight, deleteWeight, getWeights, getWeight } = require('../controllers/weightController');

router.post('/new', addWeight);
router.delete('/delete/:id', deleteWeight);
router.get('/user', getWeights);
router.get('/:id', getWeight);

module.exports = router;