function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image-view ${(props.card.link.length > 1) && 'popup_opened'}`}>
            <div className="popup__photo-zoom">
                <button className="popup__close-button" onClick={props.onClose} type="button"></button>
                <img className="popup__image" src={props.card.link} alt={`Фото. ${props.card.name}`} />
                <p className="popup__caption">{props.card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;