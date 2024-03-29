export default class UserInfo {
    constructor({ userName, userAbout, userAvatar, userId }) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
        this._userAvatar = document.querySelector(userAvatar);
        this._userId = userId;
    }
    getUserInfo() {
        const userInfoObject = {};
        userInfoObject.name = this._userName.textContent;
        userInfoObject.about = this._userAbout.textContent;
        userInfoObject.avatar = this._userAvatar.src;
        return userInfoObject;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
        this._userId = data._id;
    }

    setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }

    getUserId() {
        return this._userId;
    }
}