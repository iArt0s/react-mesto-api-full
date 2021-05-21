class Api {
  constructor(config) {
    this._url = config.url
    this.headers = config.headers;
  }

  loadUser() {
    return fetch(`${this._url}users/me/`, {
      method: "GET",
        'credentials': 'include',
      headers: this.headers
    })
    .then((res)=>{

      if(res.ok) {
        return res.json()
      }
      return Promise.reject('AAAA,все сломалось!');
    })
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
        'credentials': 'include',
      headers: this.headers
    })
    .then((res)=>{
      if(res.ok) {
        return res.json()
      }
      return Promise.reject('AAAA,все сломалось!');
    })
  }

  updateAvatar(formData) {
    return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        'credentials': 'include',
        headers: this.headers,
        body: JSON.stringify({
            avatar: formData.avatar
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('AAAA,все сломалось!');
    })
  }

  updateUserInfo(formData) {
    return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        'credentials': 'include',
        headers: this.headers,
        body: JSON.stringify({
            name: formData.name,
            about: formData.about,
            avatar: formData.avatar
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('AAAA,все сломалось!');
    })
  }

  addCard(formData) {
    return fetch(`${this._url}cards`, {
      method: "POST",
        'credentials': 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    })
    .then((res)=>{
      if(res.ok) {
        return res.json()
      }
      return Promise.reject('AAAA,все сломалось!');
    })
  }

    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._url}cards/${cardId}/likes/`, {
            method: isLiked ? 'PUT' : 'DELETE',
          'credentials': 'include',
            headers: this.headers
        })
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject('AAAA,все сломалось!');
      })
     }

  removeCard(id) {
    return fetch(`${this._url}cards/${id}`, {
        method: 'DELETE',
        'credentials': 'include',
        headers: this.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('AAAA,все сломалось!');
    })
  }
}

export const api = new Api ({
  url: "https://api.react-mesto.nomoredomains.icu/",
  headers: {
      "content-type": "application/json"
  }
})
