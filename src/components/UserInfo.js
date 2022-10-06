class UserInfo{
  constructor(nameSelector, descriptionSelector, avatarSelector){
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo(){
    return {
      userId: this._id,
      name: this._name.textContent,
      about: this._description.textContent
    }
  }

  setUserInfo({name, about, _id, avatar}){
    this._name.textContent = name;
    this._description.textContent = about;
    this._id = _id;
    this.setAvatar(avatar);
  }

  setAvatar(avatarUrl){
    this._avatar.style.backgroundImage = `url(${avatarUrl})`;
  }
}

export default UserInfo;
