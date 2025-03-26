function _fetch(endpoint, method, body) {
  const options = { method, headers: new Headers({ 'content-type': 'application/json' }) }
  if (body) options.body = JSON.stringify(body)

  return fetch(endpoint, options)
    .then(res => res.text())
    .then(json => JSON.parse(json))
}

const backend = {
  sendCode: code => {
    _fetch('/post-code', 'POST', code)
  },

  getCode: async _ => {
    return new Promise(async resolve => {
      const delay = new Promise(resolve => setTimeout(resolve, 500))
      const codes = (await Promise.all([delay, _fetch('/get-code', 'GET')]))[1]

      if (!codes[0]) {
        display.write('No messages')
        setTimeout(player.stopPlaying, 1e3)
      }

      const code = codes[Math.floor(Math.random() * codes.length)].code

      resolve(JSON.parse(code))
    })
  }
}
