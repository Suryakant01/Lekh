import { Client, Account, ID } from "appwrite"
import conf from "../../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteURL)
            .setProject(conf.appWriteProjectID)
        this.account = new Account(this.client)

    }

    async createAccount({ email, name, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AppWrite Error :: SignUp Auth Error", error);
            throw error; // Propagate the error
        }
    }
    

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)

        } catch (error) {
            console.log("AppWrite Error :: Login Auth Error", error);
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) { // Unauthorized (no session)
                console.warn("User is not logged in.");
            } else {
                console.error("AppWrite Error :: getting user Auth Error", error);
            }
        }
        return null;
    }
    

    async logout() {
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