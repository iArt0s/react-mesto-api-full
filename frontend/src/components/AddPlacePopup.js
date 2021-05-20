import PopupWithForm from './PopupWithForm';
import React, {useState, useEffect} from 'react';

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleAddName(e) {
        setName(e.target.value);
    }

    function handleAddLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        });
    }

    useEffect(() => {
        setName.value = '';
        setName.link = '';
    }, [props.isOpen])

    return (
        <PopupWithForm
            name="popup_add"
            title="Новое место"
            button="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                value={name}
                placeholder="Название"
                id="place"
                className="popup__field popup__input popup__input_place"
                required
                minLength="2"
                maxLength="30"
                onChange={handleAddName}
            />
            <span
                id="place-error"
                className="popup__error popup__error_visible"
            />
            <input
                type="url"
                name="link"
                value={link}
                placeholder="Ссылка на картинку"
                id="link"
                className="popup__field popup__input popup__input_link"
                required
                onChange={handleAddLink}
            />
            <span
                id="link-error"
                className="popup__error popup__error_visible"
            />
        </PopupWithForm>
    )
}

export default AddPlacePopup;
