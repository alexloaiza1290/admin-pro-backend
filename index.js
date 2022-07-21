const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConection } = require('./database/config');
const app = express();

app.use(cors());
//contreña
//2SwAxZt1iekf9kPX
//usuario
//alex
dbConection();

app.get('/', (req, resp) => {
    resp.json({
        ok: true,
        msg: 'hola mundo'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto' + process.env.PORT);
})