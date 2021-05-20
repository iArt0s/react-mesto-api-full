import PopupWithForm from './PopupWithForm';
import React, {useRef, useEffect} from 'react';


function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen])

    return (
        <PopupWithForm
            name="popup_update-avatar"
            title="Обновить аватар"
            button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onclose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    id="avatar__input"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на картинку"
                    className="popup__field popup__field_add popup__image-link popup__input"
                    required
                    ref={avatarRef}
                />
                <span id="avatar__input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
