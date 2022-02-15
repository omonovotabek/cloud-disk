const express = require('express')
const config = require('config')
const db = require('./database/mongodb')

const app = express()
const PORT = config.get('serverPort')

const startServer = async () => {
  try {
      db.connection()
      app.listen(PORT, () => {
          console.log('Server started on port', PORT);
      })
  } catch (error) {
      console.log(error) 
  }
}

startServer()