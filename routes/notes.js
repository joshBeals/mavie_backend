const router = require('express').Router();
const { addNote, editNote, deleteNote, getNotes, getNote } = require('../controllers/noteController');

router.post('/new', addNote);
router.put('/edit/:id', editNote);
router.delete('/delete/:id', deleteNote);
router.get('/user', getNotes);
router.get('/:id', getNote);

module.exports = router;