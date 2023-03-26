

export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userAboutSelector = document.querySelector(userAboutSelector);
    }
    getUserInfo() {
        const userInfoObject = {};
        userInfoObject.name = this._userNameSelector.textContent;
        userInfoObject.about = this._userAboutSelector.textContent;
        return userInfoObject;
    }

    setUserInfo(object) {
        this._userNameSelector.textContent = object.inputName;
        this._userAboutSelector.textContent = object.inputAbout;
}
}