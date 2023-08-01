const backend = {
  sendCode: codeArr => {
    console.log(codeArr)
  },

  getCode: () => {
    return new Promise(resolve => {
      setTimeout(e => { resolve([1000, 5000, 5000, 5000, 1000]) }, 1000)
    })
  }
}