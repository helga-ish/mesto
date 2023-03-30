export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
        method: 'GET',
        headers: this._headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
    });
    }

    getProfileUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        });
    }
}