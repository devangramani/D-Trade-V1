const api_link = 'http://dtrade.fun:3400';
const access_key = '4c68cea7e58591b579fd074bcdaff740';
export default class Backend {
  login(data) {
    return fetch(api_link + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  register(data) {
    return fetch(api_link + '/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  load_watchlist(data) {
    return fetch(api_link + '/watchlist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  load_script(data) {
    return fetch(api_link + '/all_script', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  add_script(data) {
    return fetch(api_link + '/add_script', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  delete_script(data) {
    return fetch(api_link + '/delete_script', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  load_trade(data) {
    return fetch(api_link + '/trade', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  news(data) {
    return fetch(api_link + '/news', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  forgotpassword(data) {
    return fetch(api_link + '/forgotpassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  Otp(data) {
    return fetch(api_link + '/otp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  edit_trade(data) {
    return fetch(api_link + '/edit_trade', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  position(data) {
    return fetch(api_link + '/position', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  pending_cancel(data) {
    return fetch(api_link + '/cancel', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  load_settelment(data) {
    return fetch(api_link + '/settlement', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  notifation(data) {
    return fetch(api_link + '/notifation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }

  trade(data) {
    return fetch('http://dtrade.fun:4200/trade', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: '1234',
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  pending(data) {
    return fetch('http://dtrade.fun:4200/pending', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: '1234',
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
  location(data) {
    return fetch(api_link + '/location', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }

  status(data) {
    return fetch(api_link + '/status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accesskey: access_key,
        Auth: data.token,
        id: data.id,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(response => response.json());
  }
}
