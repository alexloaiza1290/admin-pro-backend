const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConection } = require('./database/config');
const app = express();
// use  cors
app.use(cors());

//use json
app.use(express.json());
//contreña
//2SwAxZt1iekf9kPX
//usuario
//alex
app.use('/api/users', require('./routes/users.route'));

dbConection();

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto' + process.env.PORT);
})