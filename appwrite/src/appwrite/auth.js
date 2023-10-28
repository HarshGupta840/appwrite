import conf from "../config";
import { Client, Account, ID } from "appwrite"

class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log(userAccount)
                this.login({ email, password })
            } else {

                console.log("not able to signup")
            }
        } catch (error) {
            console.log("error h guru")
            console.log(error)
        }
    }
    async login({ email, password }) {
        try {
            const res = await this.account.createEmailSession(email, password);
            // console.log(await this.account.get())
            console.log(res)
            this.verify()
            return res
        } catch (error) {
            console.log(error);
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
    async verify() {
        const verify = await this.account.createVerification("http://localhost:5173/");
        console.log(verify)

    }
    async updateVerification(userid, secret) {
        const update = await this.account.updateVerification(userid, secret)
        console.log(update)
        return
    }

    async google() {
        const data = await this.account.createOAuth2Session("google", "http://localhost:5173/", 'http://localhost:5173/')
        console.log(data)
        return
    }
}

const authService = new AuthService();

export default authService