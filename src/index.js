const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser')
const userRoutes = require ('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const categoriesRoutes =  require('./routes/categoriesRoutes')
const {sequelize} = require('./models')
const port = 3000;


//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/v1', userRoutes)
app.use('/v1', categoriesRoutes)
app.use('/v1', authRoutes)

// sync sequelize  models with database
// sequelize.sync({force: false}).then(()=> {
//   console.info('Database sync succesfully')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
