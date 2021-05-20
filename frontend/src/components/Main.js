import React from 'react';
import plus from '../images/plus.svg';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile container">
                <a
                    href="# "
                    className="profile__container"
                    target="_self"
                    onClick={props.onEditAvatar}
                >
                    <img
                        src={currentUser.avatar}
                        alt="Фото профиля"
                        className="profile__image profile__image-btn"
                    />
                </a>

                <div className="profile__credentials">
                    <div className="profile__title-wrapper">
                        <h1 className="profile__credentials-title">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button hover"
                            onClick={props.onEditProfile}
                        />
                    </div>
                    <p className="profile__credentials-subtitle">{currentUser.about}</p>
                </div>
                <button
                    className="profile__btn hover"
                    type="button"
                    onClick={props.onAddPlace}
                >
                    <img
                        src={plus}
                        alt="Кнопка плюс"
                        className="profile__btn-content"
                        onClick={props.onAddPlace}
                    />
                </button>
            </section>
            <section className="gallery container">
                {props.cards.map((item) => (
                    <Card
                        key={item._id}
                        card={item}
                        onCardClick={props.onCardClick}
                        onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}/>
                ))}
            </section>
        </main>
    );
}

export default Main;
