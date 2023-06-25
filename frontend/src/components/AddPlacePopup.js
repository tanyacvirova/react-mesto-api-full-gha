import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name,
            link: link,
        });
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm name='new-card' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__form-item popup__form-item_el_title" type="text" id="title" name="name"
                placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleNameChange}  />
            <span className="title-error popup__form-error"></span>
            <input className="popup__form-item popup__form-item_el_link" type="url" id="link" name="link"
                placeholder="Ссылка на картинку" required  value={link} onChange={handleLinkChange} />
            <span className="link-error popup__form-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;

