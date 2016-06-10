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
      fetch(this.resolveUrl('push'), {
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
    });
  }

  update(data) {
    return new Promise((resolve, reject) => {
      fetch(this.resolveUrl('update'), {
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
    });
  }

  set(data) {
    return new Promise((resolve, reject) => {
      fetch(this.resolveUrl('set'), {
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
    });
  }

  remove(data) {
    return new Promise((resolve, reject) => {
      fetch(this.resolveUrl('remove'), {
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
    });
  }
}

export default TransportFetch
