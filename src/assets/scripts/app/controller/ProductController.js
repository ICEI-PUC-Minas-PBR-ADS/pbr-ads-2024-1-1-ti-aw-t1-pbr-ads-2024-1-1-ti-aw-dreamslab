import ProductsModel from "../model/ProductsModel.js";

class ProductController{

    #model = new ProductsModel();

    async getAllProducts(){
        return await this.#model.getData("products");
    }

    async getProductById(productId){
        return await this.#model.getProductById(productId);
    }

    async saveProduct(productData){
        return await this.#model.createProduct(productData);
    }

    async getProductsByBusinessId(businessId){
        return await this.#model.getByField("products", "store_id", businessId, true);
    }

    async deleteProduct(productId){
        const docId = "products_" + productId;
        return await this.#model.deleteData("products", docId);
    }

    async editProduct(productData, id){
        return await this.#model.updateData("products", productData, id); 
   }
}

export default ProductController; 