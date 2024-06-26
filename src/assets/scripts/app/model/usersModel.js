import Database from "../lib/database/Database.js";

class UsersModel extends Database{

    #table = "users";

    async createUser(userData){
        const dataReturn = {
            hasCreated: false,
            userId: null
        }

        let idToCreate;
        await this.getLastId(this.#table).then(async function(lastId){
            idToCreate = lastId + 1;
            userData.id = idToCreate; 
        });

        await this.createData('users', userData, idToCreate).then((result) =>{
            dataReturn.hasCreated = result;
            dataReturn.userId = idToCreate;
        });

        return dataReturn;
    }

    async createBusiness(businessData){
        const dataReturn = {
            hasCreated: false,
            businessId: null
        }

        let idToCreate;
        await this.getLastId('business').then(async function(lastId){
            idToCreate = lastId + 1;
            businessData.id = idToCreate; 
        });

        await this.createData('business', businessData, idToCreate).then((result) =>{
            dataReturn.hasCreated = result;
            dataReturn.businessId = idToCreate;
        });

        return dataReturn;
    }
}

export default UsersModel;

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
