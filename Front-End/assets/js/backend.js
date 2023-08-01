const apiUrl = 'https://morse-pgxsiqvyc-alaanvv.vercel.app/'

function _fetch(endpoint, method, body = undefined) {
  const options = { method: method, headers: new Headers({ 'content-type': 'application/json' }) }
  if (body) options.body = JSON.stringify(body)

  return fetch(`${apiUrl}${endpoint}`, options)
    .then(res => res.text())
    .then(json => JSON.parse(json))
}

const backend = {
  sendCode: codeArr => {
    _fetch('post-code', 'POST', codeArr)
  },

  getCode: async () => {
    return new Promise(async resolve => {
      const minDelay = new Promise(resolve => setTimeout(resolve, 1e3))
      const [_, codes] = await Promise.all([minDelay, _fetch('get-code', 'GET')])

      if (!codes[0]) {
        display.write('No messages')
        setTimeout(player.stopPlaying, 1e3)
      }

      const code = codes[Math.floor(Math.random() * codes.length)].code

      resolve(JSON.parse(code))
    })
  }
}
