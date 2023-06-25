const cardModel = require('../models/card');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  cardModel.find({})
    .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  cardModel.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  cardModel.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    })
    .then((deletedCard) => {
      if (deletedCard.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError('Карточку может удалить только ее автор.');
      }
      cardModel.findByIdAndRemove(deletedCard._id.valueOf())
        .then(res.status(200).send({ message: 'Карточка удалена.' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    })
    .then((likedCard) => {
      res.send(likedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    })
    .then((likedCard) => {
      res.send(likedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
