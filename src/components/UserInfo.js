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

  setUserInfo(name, description){
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setAvatar(avatarUrl){
    this._avatar.style.backgroundImage = `url(${avatarUrl})`;
  }

  setUserId(userId){
    this._id = userId;
  }
}

export default UserInfo;
