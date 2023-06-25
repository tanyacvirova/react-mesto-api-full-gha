function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.onClose} type="button"></button>
                <h3 className="popup__title">{props.title}</h3>
                <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__save-button" type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;