import Database from "../lib/database/Database.js";

class ProductsModel extends Database{

    #table = "products";

    async getProductById(id){
        return await this.getByField(this.#table, "id", id);
    }

    async createProduct(productsData){

        let hasCreated = false;
        let idToCreate;
        await this.getLastId(this.#table).then(async function(lastId){
            idToCreate = lastId + 1;
            productsData.id = idToCreate; 
        });

        await this.createData(this.#table, productsData, idToCreate).then((result) =>{
           hasCreated = result;
        });

        return hasCreated;
    }
}

export default ProductsModel;