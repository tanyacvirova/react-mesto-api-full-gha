const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { logInUser, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const validation = require('../middlewares/validate').validateUser;
const NotFoundError = require('../errors/not-found-err');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validation, logInUser);
router.post('/signup', validation, createUser);

router.use(auth);

router.use(usersRouter);
router.use(cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден.'));
});

module.exports = router;
