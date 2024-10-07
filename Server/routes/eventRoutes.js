const router = require('express').Router();

const { getEvents, getEvent, createEvent, updateEvent, deleteEvent,getEventsbyUser } = require('../controllers/eventcontroller');
const { checkUser } = require('../middlewares/auth');

router.get('/getEvents',checkUser, getEvents);
router.get('/getEvent/:id',checkUser, getEvent);
router.post('/createEvent',checkUser, createEvent);
router.put('/updateEvent/:id',checkUser, updateEvent);
router.delete('/deleteEvent/:id',checkUser, deleteEvent);
router.post('/getEventsUser',checkUser,getEventsbyUser);



module.exports = router;