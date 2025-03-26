const machine = {
  audio: undefined,

  beep: (time = 0) => {
    const ctx = new AudioContext()
    machine.audio = ctx.createOscillator()

    machine.audio.type = "sine"
    machine.audio.frequency.value = 250
    machine.audio.connect(ctx.destination)
    machine.audio.start()
    
    if (time) setTimeout(machine.audio.stop.bind(machine.audio), time)
    else return machine.audio
  },

  stop: () => {
    machine.audio.stop()
  }
}
