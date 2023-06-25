import successIcon from '../images/success.svg';
import errorIcon from '../images/error.svg';

function InfoTooltip(props) {
    const titles = {
        success: 'Вы успешно зарегистрировались!',
        error: 'Что-то пошло не так! Попробуйте ещё раз.'
    }

    return (
        <div className={`popup popup_type_info-tooltip ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container_info-tooltip">
                <button className="popup__close-button" onClick={props.onClose} type="button"></button>
                {props.isSuccess ? <img className="popup__icon" alt="Знак с черной галочкой." src={successIcon} /> : <img className="popup__icon" alt="Знак с красным крестиком." src={errorIcon} />}
                <h3 className="popup__title_info-tooltip">{props.isSuccess ? titles.success : titles.error}</h3>
            </div>
        </div>
    );
}

export default InfoTooltip;