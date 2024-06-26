import Database from "../lib/database/Database.js";

class ProductsModel extends Database{

    #table = "products";

    async getProductById(id){
        return {
            status: true,
            product: {
                "id": 5,
                "name": "Pizza Queijo",
                "store_id": 1,
                "img_path": "./assets/images/site/pizza.png",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed faucibus tortor, vel sagittis nunc. Aenean auctor vel arcu  vel condimentum. Aliquam hendrerit tristique elit, cursus fermentum eros eleifend et. Fusce porttitor maximus euismod. Praesent pulvinar aliquet velit id porta. Aliquam hendrerit tristique elit, cursus fermentum  eros eleifend et. Fusce porttitor maximus euismod. Praesent pulvinar aliquet velit id porta.",
                "price": "53.80",
                "delivery_time": "20min - 30min",
                "delivery_tax": "2.99",
            }
        }
    }
}

export default ProductsModel;

// const db = new Database();
// const userToCreate = {
//     "id": "",
//     "name": "asdasdaadsa create 3",
//     "email": "testecreate@cretee.com",
//     "phone": "3333333"
// };
 
// create data example
// await db.getLastId('users').then(async function(lastId){
//     userToCreate.id = Number(lastId) + 1;
//     let idToCreate = lastId + 1;
//     console.log(await db.createData('users', userToCreate, idToCreate));
// })

// update data example
// console.log(await db.updateData('users', userToCreate, '1'));

// userToCreate.id = userIdToCreate;
// console.log(userIdToCreate);
// console.log(await db.createData('users', userToCreate, userToCreate));

// delete user example
// console.log(await db.deleteData("users", "users_5"));
