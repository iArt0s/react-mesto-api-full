import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = isOwn
        ? 'card__image-button hover' : '';

    const isLiked = props.card.likes.some((i) => i === currentUser._id);

    const cardLikeButtonClassName = isLiked
        ? 'card__like-button_active hover'
        : 'card__like-button'

    function handleClick() {
        props.onCardClick({name: props.card.name, link: props.card.link});
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="card">
            <img
                src={props.card.link}
                alt={`картинка ${props.card.name}`}
                className="card__image"
                onClick={handleClick}
            />
            <button
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            />
            <div className="card__description">
                <h2 className="card__description-title">{props.card.name}</h2>
                <div className="card__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="card__like">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
