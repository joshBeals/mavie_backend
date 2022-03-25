const router = require('express').Router();
const { addMemory, deleteMemory, getMemories, getMemory } = require('../controllers/memoryController');

router.post('/new', addMemory);
router.delete('/delete/:id', deleteMemory);
router.get('/user', getMemories);
router.get('/:id', getMemory);

module.exports = router;