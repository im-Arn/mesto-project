class UserInfo {
  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar.src
      }
  }

  setUserInfo(data) {
    if (data.name) {
      this._name.textContent = data.name;
    }
    if (data.about) {
      this._about.textContent = data.about;
    }
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }
    if (data._id) {
      this.userId = data._id;
    }
  }
}

export default UserInfo



