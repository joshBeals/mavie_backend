const router = require('express').Router();
const { addNote, editNote, getNotes, getNote } = require('../controllers/noteController');

router.post('/new', addNote);
router.put('/edit/:id', editNote);
router.get('/user', getNotes);
router.get('/:id', getNote);

module.exports = router;