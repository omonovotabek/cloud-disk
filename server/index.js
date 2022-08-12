require("dotenv").config();

// Подключаем бэкенд на Express.
const express = require("express");
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middlewares/error')
const filePathMiddleware = require('./middlewares/filepathMiddleware')

const app = express();
app.use(express.json());  
app.use(cors())
app.use(filePathMiddleware(path.resolve(__dirname, '../static/files')))
app.use(fileUpload({}))

// Подключаем Mongoose и делаем коннект к базе данных.
// Прописываем стандартные настройки Mongoose.
const mongoose = require("mongoose");
mongoose.connect(`${process.env.DB_URL}`)
  .then(() => console.log('Mongodb connect ..'))
  .catch((e) => console.log(e));

// Подключаем маршруты для управления моделью Page.
const routes = require("./routes");
app.use("/api", routes);
app.use(errorHandler)

// Подключаем Nuxt в режиме nuxt.render. В этом примере нет отдельного процесса с Nuxt.
// Nuxt работает в качестве middleware для Express без своего сервера на Connect.
const { loadNuxt, build } = require("nuxt");
const isDev = process.env.NODE_ENV !== "production";
async function start() {
  const nuxt = await loadNuxt(isDev ? "dev" : "start");
  app.use(nuxt.render);
  if (isDev) {
    build(nuxt);
  }
  app.listen(process.env.PORT || 3000, () => console.log(`Server listen = ${process.env.PORT}`));
}

// Запуск приложения.
start();


