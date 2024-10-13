const router = require('express').Router();

const { getEvents, getEvent, createEvent, updateEvent, deleteEvent,getEventsbyUser, getAllEvents } = require('../controllers/eventcontroller');
const { applyEvent, getParticipantByEvent, UnApplyEvent, getEventsByParticipant, getEnrollmentStatusByevent } = require('../controllers/participantControllers');
const { checkUser } = require('../middlewares/auth');

router.get('/getEvents',checkUser, getEvents);
router.get('/getEvent/:id',checkUser, getEvent);
router.post('/createEvent',checkUser, createEvent);
router.put('/updateEvent/:id',checkUser, updateEvent);
router.delete('/deleteEvent/:id',checkUser, deleteEvent);
router.post('/getEventsUser',checkUser,getEventsbyUser);
router.post('/applyEvent/:id',checkUser,applyEvent);
router.get('/getParticipant/:id',checkUser,getParticipantByEvent);
router.get('/getAllEvents',checkUser,getAllEvents);
router.post('/unApplyEvent/:id',checkUser,UnApplyEvent);
router.get('/getEnrollmentStatus/:id',checkUser,getEnrollmentStatusByevent);
router.get('/getEventsByParticipant',checkUser,getEventsByParticipant);



module.exports = router;