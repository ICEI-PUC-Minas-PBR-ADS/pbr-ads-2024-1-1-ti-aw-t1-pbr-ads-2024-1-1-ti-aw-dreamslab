import BusinessModel from "../model/BusinessModel.js";

class BusinessController{

    #businessModel = new BusinessModel();

    async createBusiness(businessData){
        let modelResult = null;
        await this.#businessModel.createBusiness(businessData).then((result)=>{
            modelResult = result;
        });
        
        return modelResult;
    }

    async getBusinessDataByOwnerId(ownerId){
        const businessData = await this.#businessModel.getByField('business', 'owner_id', ownerId);
        return businessData;
    }
}

export default BusinessController;