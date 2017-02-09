const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');           //node web 安全插件 防护脚本注入 XXS跨站脚本等防护
const compression = require('compression'); //node gzip压缩插件
const cookieParser = require('cookie-parser');
const argv = require('yargs').argv;

const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

if (argv.env === "development" || argv.env === "dev") {
  console.log("开发环境");
} else {
  if (argv.env === "production" || argv.env === "prod") {
    console.log("正式环境");
  }
  app.use(express.static(path.join(__dirname, "dist")));
  app.use("**", express.static(path.join(__dirname, "dist/index.html")));
}

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  console.log(err);
  next(err);
});

// 处理错误，返回错误信息
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

var server = app.listen(3015, function () {
  console.info('Listening app on port %d', server.address().port);
});


