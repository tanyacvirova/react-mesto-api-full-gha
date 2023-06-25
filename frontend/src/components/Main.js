import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main(props) {
    const user = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar" style={{ backgroundImage: `url("${user.avatar}")` }}>
                        <button className="profile__edit-avatar-button" onClick={props.onEditAvatar} type="button"></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__title">
                            <h1 className="profile__name">{user.name}</h1>
                            <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                        </div>
                        <p className="profile__job">{user.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} type="button"></button>
            </section>
            <section className="elements">
                {props.cards.map(card => {
                    return (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />);
                })}
            </section>
        </main>
    );
}

export default Main;