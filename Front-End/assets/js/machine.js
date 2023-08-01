const machine = {
  beep: (time = 0) => {
    const ctx = new AudioContext()
    const audio = ctx.createOscillator()

    audio.type = "sine"
    audio.frequency.value = 300
    audio.connect(ctx.destination)
    audio.start()
    
    if (time) setTimeout(audio.stop.bind(audio), time)
    else return audio
  }
}