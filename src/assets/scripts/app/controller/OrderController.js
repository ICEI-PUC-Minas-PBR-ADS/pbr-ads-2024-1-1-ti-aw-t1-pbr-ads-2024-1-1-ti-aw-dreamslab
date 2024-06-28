import OrderModel from "../model/OrderModel.js";

class OrderController{

    #model = new OrderModel();

    async createOrder(orderData, cartData){

        const ordersToCreate = this.getOrderByStoreId(cartData)
        console.log(ordersToCreate);
        let hasCraeted = false;
        for(const store in ordersToCreate){
            orderData.itens = JSON.stringify(ordersToCreate[store]);
            hasCraeted = await this.#model.createOrder(orderData);
        }

        return hasCraeted;
    }

    getOrderByStoreId(cartData) {
        return cartData.reduce((result, order) => {
          const { store_id } = order;
          if (!result[store_id]) {
            result[store_id] = [];
          }
          result[store_id].push(order);
          return result;
        }, {});
    }
}

export default OrderController;