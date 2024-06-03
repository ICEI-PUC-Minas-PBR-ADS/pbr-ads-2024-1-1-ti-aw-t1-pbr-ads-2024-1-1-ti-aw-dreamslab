import Database from "../app/lib/database/Database.js";

const db = new Database();

const userToCreate = {
    "id": "",
    "name": "asdasdaadsa create 3",
    "email": "testecreate@cretee.com",
    "phone": "3333333"
};
 
// create data example
// await db.getLastId('users').then(async function(lastId){
//     userToCreate.id = Number(lastId) + 1;
//     let idToCreate = lastId + 1;
//     console.log(await db.createData('users', userToCreate, idToCreate));
// })

//update data example
// console.log(await db.updateData('users', userToCreate, '1'));

// userToCreate.id = userIdToCreate;
// console.log(userIdToCreate);
// console.log(await db.createData('users', userToCreate, userToCreate));

//delete user example
console.log(await db.deleteData("users", "users_5"));