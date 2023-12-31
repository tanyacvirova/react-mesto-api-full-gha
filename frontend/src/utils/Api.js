class Api {
    constructor(path) {
        this._path = path;
    }

    _getHeaders() {
        return {
            'Content-Type': 'application/json',
            authorization: `Bearer ${this._token}`,
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    setToken(token) {
        this._token = token;
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

const api = new Api('https://backend.tanyacvirova.nomoreparties.sbs');
export default api;