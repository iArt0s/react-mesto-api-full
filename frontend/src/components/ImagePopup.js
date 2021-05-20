function ImagePopup(props) {
    return (
        <div
            className={`popup popup-img ${
                props.card.link.length > 0 && 'popup_opened'
            }`}
        >
            <div className="popup__container-img">
                <img
                    src={`${props.card.link}`}
                    alt={`картинка ${props.card.name}`}
                    className="popup__img"
                />
                <span className="popup__img-title">{props.card.name}</span>
                <button
                    className="popup__close-button popup__close-button_img hover"
                    type="button"
                    onClick={props.onClose}
                />
            </div>
        </div>
    );
}

export default ImagePopup;
