import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

// Set middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set Routes
const api = require('./api/v1.js');
app.use("/", api);

// Set Error Handling (Should be done after all routes are defined)
app.use(function(req, res, next){
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send(err.status);
});

// Start the Server
app.listen(3001, () => console.log('Siphonr API Running'));
