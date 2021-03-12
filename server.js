const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(cors())

const db = require('./app/config/db.config.js');
 

db.sequelize.sync()
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

require('./app/route/categoria.route.js')(app);
require('./app/route/posteo.route.js')(app);
 
// Create a Server
app.listen(3000,()=>{
  console.log("Server started on port 3000")
})