const express = require('express');
const router = express.Router();
const ServiceRepository = require('./ServiciosRepository');

// Ruta para obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const services = await ServiciosRepository.findAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un servicio por ID
router.get('/:id', async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await ServiciosRepository.findServiceById(serviceId);
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para crear un nuevo servicio
router.post('/', async (req, res) => {
    try {
        const serviceData = req.body;
        const createdService = await ServiciosRepository.createService(serviceData);
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para actualizar un servicio por ID
router.put('/:id', async (req, res) => {
    try {
        const serviceId = req.params.id;
        const serviceData = req.body;
        const updatedService = await ServiciosRepository.updateService(serviceId, serviceData);
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para eliminar un servicio por ID
router.delete('/:id', async (req, res) => {
    try {
        const serviceId = req.params.id;
        const deletedService = await ServiciosRepository.deleteService(serviceId);
        res.json(deletedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
