const mysql = require('mysql')

class Database {
  constructor(host, port, user, database, password) {
    this.conn = mysql.createConnection({ host, port, user, database, password })
  }

  get_codes() {
    return new Promise(resolve => {
      this.conn.query('SELECT code FROM codes;', (err, res) => { if (err) throw err; resolve(res) })
    })
  }

  post_code(code) {
    this.conn.query('INSERT INTO codes (code) VALUES (?);', [code])
  }
}

module.exports = Database