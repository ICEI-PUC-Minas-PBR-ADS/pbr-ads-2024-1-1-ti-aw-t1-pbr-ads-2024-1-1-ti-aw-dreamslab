import { firebaseConfig } from "../../config/config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc, query, where, deleteDoc} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore-lite.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class Database {

    async getData(table) {
        const dataCollection = collection(db, table);
        const snapshot = await getDocs(dataCollection);
        const dataList = snapshot.docs.map(function (doc) {
            return {
                "id": doc.id,
                "data": doc.data()
            }
        });
        return dataList;
    }

    async getByField(table, field, value) {
        const dataCollection = collection(db, table);
        const dataQuery = query(dataCollection, where(field, "==", value));
        const querySnapshot = await getDocs(dataQuery);
        const dataById = querySnapshot.docs.map(function(doc){
            return  doc.data();
        });
        return dataById[0];
    }

    async getLastId(table){
        let lastId = 0;
        await this.getData(table).then(function(dataCollection){
            dataCollection.forEach(eachDocument => {
                if(eachDocument.data.id > lastId){
                    lastId = eachDocument.data.id;
                }
            });
        });
        return Number(lastId);
    }

    async createData(table, data, id) {
        try {
            const idToCreate = table + "_" + id;
            console.log(idToCreate)
            let result = false;
            await setDoc(doc(db, table, idToCreate), data).then(()=>{
                result = true;
            });
            return result;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateData(table, data, id){
        try {
            let dataToUpdate = await this.getById(table, id).then(async function(dataToUpdate){
                for(let key in data){
                    if(dataToUpdate.hasOwnProperty(key)){
                        dataToUpdate[key] = data[key];
                    }
                };
                return dataToUpdate
            });
            let updateResponse = false;
            await this.createData(table, dataToUpdate, id).then(function(result){
                updateResponse = result;
            });
            return updateResponse;
        } catch (err) {
            console.log(err);
        } 
    }

    async deleteData(table, docId){
        try{
            let hasDeleted = false;
            await deleteDoc(doc(db, table, docId)).then(function(){
                hasDeleted = true;
            });
            
            return hasDeleted;
        }catch(error){
            console.log(error);
            return false;
        }
    }
}

export default Database;