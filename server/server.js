const express  = require("express");
const cors = require("cors")
const routes = require('./routes');
const fs = require('fs');

const PORT = 8080;
const app = express();

const uploadDirectory = 'uploads/';
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

app.use(cors());
app.use(routes);

app.get('/hey', (req, res)=>{return res.json({"msg" : "hello"})});

app.listen(PORT, ()=>{
    console.log("Server started at port " + PORT);
});
