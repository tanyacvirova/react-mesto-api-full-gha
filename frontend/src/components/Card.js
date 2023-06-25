import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const user = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === user._id;
    const isLiked = props.card.likes.some(i => i._id === user._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="element">
            <img className="element__photo" src={props.card.link} onClick={handleClick} alt={`Фото. ${props.card.name}`} />
            {isOwn && <button className='element__delete' type='button' onClick={handleDeleteClick}/>}
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;