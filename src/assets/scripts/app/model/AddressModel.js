import Database from "../lib/database/Database.js";

class AddressModel extends Database{

    #table = "address";

    async createAddress(addressData){
        const dataReturn = {
            hasCreated: false,
        }

        let idToCreate;
        await this.getLastId(this.#table).then(async function(lastId){
            idToCreate = lastId + 1;
            addressData.id = idToCreate; 
        });

        await this.createData(this.#table, addressData, idToCreate).then((result) =>{
            dataReturn.hasCreated = result;
        });

        return dataReturn;
    }

    async updateAddress(addressToUpdate){
        const dataReturn = {
            hasUpdated: false,
        }

        const idToUpdate = addressToUpdate.id;
        await this.updateData(this.#table, addressToUpdate, idToUpdate).then((result)=>{
            dataReturn.hasUpdated = result;          
        })

        return dataReturn;
    }
}

export default AddressModel;

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
