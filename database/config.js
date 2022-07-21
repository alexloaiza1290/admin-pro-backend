const mongoose = require('mongoose');
const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('BD online');

    } catch (error) {
    module.exports = {
        dbConection
    }
        console.log(error);
        throw new Error('Error a la hora de iniciar la conexion...!');
    }
}
module.exports = {
    dbConection
}