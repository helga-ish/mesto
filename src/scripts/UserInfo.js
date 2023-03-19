

export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;
    }
    getUserInfo() {
        const userInfoObject = {};
        userInfoObject.name = this._userNameSelector;
        userInfoObject.about = this._userAboutSelector;
        return userInfoObject;
    }

    setUserInfo(object) {
        this._userNameSelector = object.inputName;
        this._userAboutSelector = object.inputAbout;
        console.log(object);
    }
}