import AddressModel from "../model/AddressModel.js";

class AddressController{

    #addressModel = new AddressModel();

    async saveAddress(dataAddress){
        let modelResult = null;
        await this.#addressModel.createAddress(dataAddress).then((result)=>{
            modelResult = result;
        });
        
        return modelResult;
    }

    async updateAddress(dataAddress){
        let modelResult = null;
        await this.#addressModel.updateAddress(dataAddress).then((result)=>{
            modelResult = result;
        });
        
        return modelResult;
    }

    async getUserAddress(){
        const userId = Number(localStorage.getItem("userId"));
        return await this.#addressModel.getByField('address', 'user_id', userId);
    }
}

export default AddressController;