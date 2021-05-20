import PopupWithForm from './PopupWithForm';
import React, {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleAboutChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="popup_edit"
            title="Редактировать профиль"
            button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                defaultValue={name}
                id="nickname"
                placeholder="Имя"
                className="popup__field popup__input"
                required
                minLength="2"
                maxLength="40"
                onChange={handleNameChange}
            />
            <span id="nickname-error" className="popup__error popup__error_visible"/>
            <input
                type="text"
                name="about"
                defaultValue={description}
                id="info"
                placeholder="Вид деятельности"
                className="popup__field popup__input"
                required
                minLength="2"
                maxLength="200"
                onChange={handleAboutChange}
            />
            <span id="info-error" className="popup__error popup__error_visible"/>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
