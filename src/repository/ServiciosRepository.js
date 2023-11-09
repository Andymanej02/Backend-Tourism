const Service = require('./ServiciosModels');

class ServiceRepository {
    async findAllServices() {
        try {
            const services = await Service.find();
            return services;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findServiceById(serviceId) {
        try {
            const service = await Service.findById(serviceId);
            if (!service) {
                throw new Error('Service not found');
            }
            return service;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createService(serviceData) {
        try {
            const newService = new Service(serviceData);
            const createdService = await newService.save();
            return createdService;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateService(serviceId, serviceData) {
        try {
            const updatedService = await Service.findByIdAndUpdate(serviceId, serviceData, { new: true });
            if (!updatedService) {
                throw new Error('Service not found');
            }
            return updatedService;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteService(serviceId) {
        try {
            const deletedService = await Service.findByIdAndRemove(serviceId);
            if (!deletedService) {
                throw new Error('Service not found');
            }
            return deletedService;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new ServiceRepository();
