import OrderModel from "../model/OrderModel.js";

class OrderController{

    #model = new OrderModel();

    async createOrder(orderData, cartData){
        const ordersToCreate = this.#getOrderByStoreId(cartData)
        console.log(ordersToCreate);
        let hasCraeted = false;
        for(const store in ordersToCreate){
            orderData.itens = JSON.stringify(ordersToCreate[store]);
            orderData.store_id = store;
            hasCraeted = await this.#model.createOrder(orderData);
        }

        return hasCraeted;
    }

    #getOrderByStoreId(cartData) {
        return cartData.reduce((result, order) => {
          const { store_id } = order;
          if (!result[store_id]) {
            result[store_id] = [];
          }
          result[store_id].push(order);
          return result;
        }, {});
    }

    async getOrdersByUserId(){
      const userId = Number(localStorage.getItem("userId"));
      return this.#model.getByField("orders", "userId", userId, true);
    }

    async getOrderById(orderId){
      return this.#model.getByField("orders", "id", orderId);
    }

    async confirmDelivery(orderId){
      return this.#model.updateData("orders", {status: "5"}, orderId);
    }

    async cancelDelivery(orderId){
      return this.#model.updateData("orders", {status: "0"}, orderId);
    }

    async acceptDelivery(orderId){
      return this.#model.updateData("orders", {status: "2"}, orderId);
    }

    async updateStatusDelivery(orderId, status){
      return this.#model.updateData("orders", {status: status}, orderId);
    }

    async getOrdersByBusiness(businessId){
      return this.#model.getByField("orders", "store_id", businessId, true);
    }
}

export default OrderController;