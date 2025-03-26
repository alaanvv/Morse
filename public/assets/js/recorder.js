const recorder = {
  dom: document.querySelector('.rec'),

  lastAction: undefined, // Will store the Date.now() when clicking or releasing space
  code: [],

  beep: undefined,

  record: () => {
    display.write('SPACE TO BEEP')

    const handleAction = e => {
      display.write('RECORDING')

      if (e.key !== ' ' || e.repeat) return

      if (recorder.lastAction) recorder.code.push(Date.now() - recorder.lastAction)
      recorder.lastAction = Date.now()

      if (!recorder.beep) recorder.beep = machine.beep()
      else {
        recorder.beep.stop()
        recorder.beep = undefined
      }
    }

    window.onkeydown = handleAction
    window.onkeyup = handleAction
  },

  stopRecording: () => {
    // Send code
    if (recorder.code % 2 === 0) recorder.code.pop()
    backend.sendCode(recorder.code)
    
    // Reset stuff
    display.clear()
    
    window.onkeydown = undefined
    window.onkeyup = undefined

    recorder.lastAction = undefined
    recorder.code = []
    recorder.beep = undefined
  },

  onclick: () => {
    if (player.dom.getAttribute('pressed') !== null) return
    if (recorder.dom.getAttribute('pressed') === null) { // Pressing
      recorder.dom.setAttribute('pressed', '')

      recorder.record()
    }
    else { // Unpressing
      recorder.dom.removeAttribute('pressed')

      recorder.stopRecording()
    }
  }
}

recorder.dom.onclick = recorder.onclick
