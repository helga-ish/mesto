export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _promiseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
        method: 'GET',
        headers: this._headers,
    }).then((res) => {
        return this._promiseResponse(res);
    });
    }

    getProfileUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => {
            return this._promiseResponse(res);
        });
    }

    changeProfileUserInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.inputName,
                about: data.inputAbout
            })
        }).then((res) => {
            return this._promiseResponse(res);
        });
    }

    editAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.inputLinkAvatar
            })
        }).then((res) => {
            return this._promiseResponse(res);
        });
    }

    addCard(data) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then((res) => {
            return this._promiseResponse(res);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            return this._promiseResponse(res);
        });
    }

    changeLikeStatus(cardId, like) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: like ? 'PUT' : 'DELETE',
            headers: this._headers,
        }).then((res) => {
            return this._promiseResponse(res);
        });
    }
}