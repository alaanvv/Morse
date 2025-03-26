const display = {
  dom: document.querySelector('.display'),

  write: text => display.dom.innerText = '> ' + text.toUpperCase(),
  clear: _ => display.write('')
}
