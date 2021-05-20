function PopupWithForm(props) {
  return (
    <div className={`popup ${props.name} ${props.isOpen && "popup_opened"}`}>
      <form className="popup__container popup__form" onSubmit={props.onSubmit} name={props.name} noValidate>
        <button
          className="popup__close-button hover"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__container-title">{props.title}</h2>

        {props.children}

        <button
          className="popup__submit-button popup__button hover"
          type="submit"
        >
          {props.button}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
