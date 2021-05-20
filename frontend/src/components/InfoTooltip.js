import done from '../images/done.svg';
import fail from '../images/fail.svg';

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.status && 'popup_opened'}`}>
            <div className="popup__container popup__container_img">
                <button
                    className="popup__close-button hover"
                    type="button"
                    onClick={props.onClose}
                ></button>
                <img
                    className="popup__img-status"
                    src={`${props.status === 'done' ? done : fail}`} alt={`${props.status === 'done' ? 'Успешная регистрация' : 'Что-то пошло не так'}`} />
                <h2 className="popup__container-title popup__container-title_img">{`${props.status === 'done' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;
