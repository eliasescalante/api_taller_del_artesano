import Business from "../models/Business.js";

class BusinessRepository {
    static async createBusiness(businessData) {
        try {
            const newBusiness = await Business.create(businessData);
            return newBusiness;
        } catch (error) {
            throw new Error("Error creating business: " + error.message);
        }
    }

    static async getBusinessById(businessId) {
        try {
            const business = await Business.findById(businessId);
            return business;
        } catch (error) {
            throw new Error("Business not found: " + error.message);
        }
    }
}

export default BusinessRepository;
