import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const linkRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: linkRef.current.value
        });
        linkRef.current.value = '';
    }

    return (
        <PopupWithForm name='edit-avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__form-item popup__form-item_el_avatar" type="url" id="avatar" name="avatar"
                placeholder="Ссылка на новый аватар" required ref={linkRef} />
            <span className="avatar-error popup__form-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;