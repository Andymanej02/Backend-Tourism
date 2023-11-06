const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = Schema({
    nombres: String,
    id: String,
    precio: String,
    informacion: String,
    imagen: String,
});

ServiceSchema.methods.setImgUrl = function setImgUrl () {
    
}
module.exports = mongoose.model('servicios_collection', ServiceSchema);