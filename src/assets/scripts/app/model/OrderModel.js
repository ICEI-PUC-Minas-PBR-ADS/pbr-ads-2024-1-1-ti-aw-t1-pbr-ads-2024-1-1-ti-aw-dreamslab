import Database from "../lib/database/Database.js";

class OrderModel extends Database{

    #table = "orders";

    async createOrder(orderData){
        let idToCreate;
        await this.getLastId(this.#table).then(function(lastId){
            idToCreate = lastId + 1;
            orderData.id = idToCreate; 
        });

        return await this.createData(this.#table, orderData, idToCreate)
    }
}

export default OrderModel;