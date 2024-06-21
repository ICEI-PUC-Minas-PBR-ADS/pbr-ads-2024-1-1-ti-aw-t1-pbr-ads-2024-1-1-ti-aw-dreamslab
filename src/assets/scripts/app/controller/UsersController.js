import UsersModel from "../model/usersModel.js";

class UsersController{

    #usersModel = new UsersModel;

    async createUser(formData){
        let modelResult = null;
        await this.#usersModel.createUser(formData).then((result)=>{
            modelResult = result;
        });
        
        return modelResult;
    }

    async authenticateUser(dataToLogin){
        let userData = await this.#usersModel.getByField('users', 'email', dataToLogin.email);
        console.log(userData);
        if(userData.length == 0){
            return {
                status: false,
                message: "Nenhuma conta encontrada com esses dados!"
            };
        }

        if(userData.password != dataToLogin.password){
            return {
                status: false,
                message: "E-mail ou senha incorretos!"
            };
        }

        let hasBusiness = typeof userData.hasBusiness !== "undefined" ? true : false;

        return {
            status: true,
            userId: userData.id,
            hasBusiness: hasBusiness
        };
    }

    async getUserById(){
        const userId = Number(localStorage.getItem("userId"));
        return await this.#usersModel.getByField("users", "id", userId);
    }

    async updateUser(userDataToUpdate, typedPass){
        const idToUpdate = Number(localStorage.getItem("userId"));
        const userData = await this.#usersModel.getByField('users', 'id', idToUpdate);
        
        if(userData.password != typedPass){
            return {
                hasUpdated: false,
                message: "Senha atual incorreta!"
            };
        }

        const hasUpdated = await this.#usersModel.updateData("users", userDataToUpdate, idToUpdate); 
        const message = hasUpdated == true ? "Dados atualizados com sucesso!" : "Houve um erro ao atualizar os dados!";

        return{
            hasUpdated: hasUpdated,
            message: message
        };
    }
}

export default UsersController;