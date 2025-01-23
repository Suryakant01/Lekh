import { Client, Account, ID } from "appwrite"
import conf from "../../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setProject(conf.appWriteProjectID)
        this.account = new Account(this.client)

    }

    createAccount = async ({ email, name, password }) => {
        try {
            const userAccount =  await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                //call another method
                this.login(email, password)
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("AppWrite Error :: SignUp Auth Error", error);

        }
    }

    login = async ({ email, password }) => {
        try {
            return await this.account.createEmailPasswordSession(email, password)
            
        } catch (error) {
            console.log("AppWrite Error :: Login Auth Error", error);
        }
    }

    getUser = async () => {
        try {
            return await this.account.get(
                'current',
            )
        } catch (error) {
            console.log("AppWrite Error :: getting user Auth Error", error);
        }
    }

    logout = async () => {
        try {
            return await this.account.deleteSession(
                'current',
            )
        } catch (error) {
            console.log("AppWrite Error :: logout user Auth Error", error);
        }
    }

}


const authService = new AuthService();

export default authService;