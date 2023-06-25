class Api {
    constructor(path, token) {
        this._path = path;
        this._token = token;
    }

    _getHeaders() {
        return {
            'Content-Type': 'application/json',
            authorization: this._token,
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(`${this._path}/cards`, {
            headers: this._getHeaders()
        })
            .then(this._getJson);
    }

    createNewCard(item) {
        return fetch(`${this._path}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify(item)
        })
            .then(this._getJson);
    }

    getCurrentUser() {
        return fetch(`${this._path}/users/me`, {
            headers: this._getHeaders()
        })
            .then(this._getJson);
    }

    deleteCard(id) {
        return fetch(`${this._path}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        })
            .then(this._getJson);
    }

    editPersonalInfo(info) {
        return fetch(`${this._path}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify(info)
        })
            .then(this._getJson);
    }

    editAvatar(avatar) {
        return fetch(`${this._path}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify(avatar)
        })
            .then((this._getJson));
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._path}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._getHeaders()
            })
                .then(this._getJson);
        } else {
            return fetch(`${this._path}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._getHeaders()
            })
                .then(this._getJson);
        }

    }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61', 'b0e1bcc1-0d9d-46ff-bf36-be0a9e1dd630');
export default api;