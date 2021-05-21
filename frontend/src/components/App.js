import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {useEffect, useState} from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import {api} from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import Burger from './Burger';



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [tooltipStatus, setTooltipStatus] = useState('');
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [email, setEmail] = useState('');




    useEffect(() => {
    api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    api
        .loadUser()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => console.log(err));
  }
  function handleCardDelete(removedCard) {
    api.removeCard(removedCard._id).then(() => {
      const newArr = cards.filter(card => card._id !== removedCard._id);
      setCards(newArr);
    }).catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setTooltipStatus('');
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData)
  }

  function handleUpdateUser(formData) {
    api
        .updateUserInfo(formData)
        .then((formData) => {
          setCurrentUser(formData);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(formData) {
    api
        .updateAvatar(formData)
        .then((formData) => {
          setCurrentUser(formData);
          closeAllPopups();
        })
        .catch((err) => console.log(err));

  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

    function handleBurgerMenuClick() {
        setBurgerMenu(prevBurgerMenuState => !prevBurgerMenuState);
    }

    function onRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                if (res._id) {
                    setTooltipStatus('done');
                    history.push('/sign-in')
                }
            })
            .catch(res => setTooltipStatus('fail'));
    }

    function onLogin({ password, email }) {
        auth.authorize({ password, email })
            .then((data) => {
                if (data._id) {
                    setEmail(email);
                    localStorage.setItem('userId', data._id);
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    function onSignOut() {
        localStorage.removeItem('userId');
        setLoggedIn(false);
        setBurgerMenu(false);
        history.push('/sign-in');
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            auth.getContent(userId)
                .then((res) => {
                    if (res) {
                        setEmail(res.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch(err => console.log(err));
        }
    }, [history])

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
              <Burger
              isOpen={burgerMenu}
              email={email}
              onBurgerMenuClick={handleBurgerMenuClick}
              onSignOut={onSignOut}
              />
            <Header
                onBurgerMenuClick={handleBurgerMenuClick}
                onSignOut={onSignOut}
                email={email}
                burgerStatus={burgerMenu}
            />
            <Switch>
                <ProtectedRoute
                    exact path='/'
                    loggedIn={loggedIn}
                    component={Main}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Route path="/sign-in">
                    <Login onLogin={onLogin} />
                </Route>

                <Route path="/sign-up">
                    <Register onRegister={onRegister} />
                </Route>

                <Route>
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>

            </Switch>
              <Footer/>
              <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
              />
              <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
              />
              <PopupWithForm name="popup_delete" title="Вы уверены?" button="Да"/>
              <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
              <InfoTooltip status={tooltipStatus} onClose={closeAllPopups} />
          </div>
      </CurrentUserContext.Provider>

  );
}

export default App;
