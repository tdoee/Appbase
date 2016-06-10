import { appbaseSymbol } from '../Appbase'
import Transport from '../Transport'
import fetch from 'node-fetch'

export class TransportFetch extends Transport {

  constructor(app, url) {
    super(app, url)
  }

  request(data) {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    });
  }

  push(data) {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    }, 2000);
  }

  update(data) {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    }, 2000);
  }

  set(data) {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    }, 2000);
  }

  remove(data) {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    }, 2000);
  }
}

export default TransportFetch
