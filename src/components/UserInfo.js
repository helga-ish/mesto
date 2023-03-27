

export default class UserInfo {
    constructor({ userName, userAbout }) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
    }
    getUserInfo() {
        const userInfoObject = {};
        userInfoObject.name = this._userName.textContent;
        userInfoObject.about = this._userAbout.textContent;
        return userInfoObject;
    }

    setUserInfo(object) {
        this._userName.textContent = object.inputName;
        this._userAbout.textContent = object.inputAbout;
}
}