import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

/* contexts */
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

/* utils */
import api from '../utils/Api.js';
import * as auth from '../utils/Auth.js';

/* components */
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  /* code from project 11 */
  const [isEditProfilePopupOpen, setEditProfilePopupStatus] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupStatus] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupStatus] = useState(false);
  const [selectedCard, setSelectedCardStatus] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getCurrentUser()
      .then(info => {
        setCurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    api.getCards()
      .then(data => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarPopupStatus(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupStatus(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupStatus(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupStatus(false);
    setEditProfilePopupStatus(false);
    setAddPlacePopupStatus(false);
    setInfoTooltipStatus(false)
    setSelectedCardStatus({ name: '', link: '' });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const result = cards.filter(renderedCard => renderedCard._id !== card._id);
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser(newInfo) {
    api.editPersonalInfo(newInfo)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then(newAvatar => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(item) {
    api.createNewCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /* registration and authorization  */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [isInfoTooltipOpen, setInfoTooltipStatus] = useState(false);
  const [isSuccessfulReg, setSuccessfulReg] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    auth.getUserData(token)
      .then((user) => {
        setUserData(user);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, navigate]);

  function registration(formData) {
    auth.registerUser(formData)
      .then((res) => {
        setToken(res.token);
        setInfoTooltipStatus(true);
        setSuccessfulReg(true);
      }).catch((err) => {
        console.log(err);
        setInfoTooltipStatus(true);
        setSuccessfulReg(false);
      });
  }

  function login(formData) {
    auth.authorizeUser(formData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function logout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setUserData({
      _id: "",
      email: "",
    });
    navigate("/login");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userData.data && userData.data.email} logout={logout} />
        <Routes>
          <Route path="/" element={<ProtectedRouteElement element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={(data) => setSelectedCardStatus(data)}
            cards={cards}
            onCardLike={(data) => handleCardLike(data)}
            onCardDelete={(data) => handleCardDelete(data)}
            loggedIn={isLoggedIn} />} />
          <Route path='/sign-in' element={<Login onSubmit={(data) => login(data)} />} />
          <Route path='/sign-up' element={<Register onSubmit={(data) => registration(data)} />} />
          <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={(newInfo) => handleUpdateUser(newInfo)} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={(newCard) => handleAddPlaceSubmit(newCard)} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={(avatar) => handleUpdateAvatar(avatar)} />
        <PopupWithForm name='confirm' title='Вы уверены?' onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isSuccessfulReg} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;