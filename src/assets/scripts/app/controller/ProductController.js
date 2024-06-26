import ProductsModel from "../model/ProductsModel.js";

class ProductController{

    #model = new ProductsModel();

    async getProductById(productId){
        return await this.#model.getProductById(productId);
    }
}

export default ProductController; 