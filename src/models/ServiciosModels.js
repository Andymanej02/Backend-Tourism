const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    // Otros campos relacionados con un servicio
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
