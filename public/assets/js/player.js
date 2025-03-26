const player = {
  dom: document.querySelector('.get'),

  code: [],

  play: async () => {
    document.querySelector('.personal').focus()
    display.write('Loading')
    player.code = await backend.getCode()
    display.write('Playing')

    for (let i = 0; i < player.code.length; i++) {
      if (player.dom.getAttribute('pressed') === null) return
      if (i % 2 === 0) machine.beep(player.code[i])
      await new Promise(resolve => setTimeout(resolve, player.code[i]))
    }

    player.stopPlaying()
  },

  stopPlaying: () => {
    display.write('Ended')
    setTimeout(display.clear, 1e3)
    player.dom.removeAttribute('pressed')
  },

  onclick: () => {
    if (recorder.dom.getAttribute('pressed') !== null) return
    if (player.dom.getAttribute('pressed') !== null) {
      player.dom.removeAttribute('pressed')
      display.clear()
      machine.stop()
      return
    }

    player.dom.setAttribute('pressed', '')

    player.play()
  }
}

player.dom.onclick = player.onclick
